import minterHex from "./contracts/jetton-minter.compiled.json";
import walletHex from "./contracts/jetton-wallet.compiled.json";
import { beginCell, toNano, Cell, beginDict } from "ton";
import { Sha256 } from "@aws-crypto/sha256-js";

export const mintContractHex = Cell.fromBoc(minterHex.hex)[0];
export const walletContractHex = Cell.fromBoc(walletHex.hex)[0];

const jettonOnChainMetadataSpec = {
  name: "utf8",
  description: "utf8",
  symbol: "utf8",
  decimals: "utf8",
};

const sha256 = (str: string) => {
  const sha = new Sha256();
  sha.update(str);
  return Buffer.from(sha.digestSync());
};

export function mintBody(owner, jettonValue, transferToJWallet, queryId) {
  return beginCell()
    .storeUint(21, 32)
    .storeUint(queryId, 64) // queryid
    .storeAddress(owner)
    .storeCoins(transferToJWallet)
    .storeRef(
      // internal transfer message
      beginCell()
        .storeUint(0x178d4519, 32)
        .storeUint(0, 64)
        .storeCoins(jettonValue)
        .storeAddress(null)
        .storeAddress(owner)
        .storeCoins(toNano(0.001))
        .storeBit(false) // forward_payload in this slice, not separate cell
        .endCell()
    )
    .endCell();
}

export function buildJettonOnchainMetadata(data) {
  const KEYLEN = 256;
  const dict = beginDict(KEYLEN);

  Object.entries(data).forEach(([k, v]) => {
    if (!jettonOnChainMetadataSpec[k]) throw new Error(`Unsupported onchain key: ${k}`);
    if (v === undefined || v === "") return;

    let bufferToStore = Buffer.from(v, jettonOnChainMetadataSpec[k]);

    const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

    const rootCell = new Cell();
    rootCell.bits.writeUint8(0x00);
    let currentCell = rootCell;

    while (bufferToStore.length > 0) {
      currentCell.bits.writeBuffer(bufferToStore.slice(0, CELL_MAX_SIZE_BYTES));
      bufferToStore = bufferToStore.slice(CELL_MAX_SIZE_BYTES);
      if (bufferToStore.length > 0) {
        let newCell = new Cell();
        currentCell.refs.push(newCell);
        currentCell = newCell;
      }
    }

    dict.storeRef(sha256(k), rootCell);
  });

  return beginCell().storeInt(0x00, 8).storeDict(dict.endDict()).endCell();
}

export function buildJettonOffChainMetadata(contentUri) {
  return beginCell().storeInt(0x01, 8).storeBuffer(Buffer.from(contentUri, "ascii")).endCell();
}

export function initData(owner, data, offchainUri) {
  if (!data && !offchainUri) {
    throw new Error("Must either specify onchain data or offchain uri");
  }
  return beginCell()
    .storeCoins(0)
    .storeAddress(owner)
    .storeRef(offchainUri ? buildJettonOffChainMetadata(offchainUri) : buildJettonOnchainMetadata(data))
    .storeRef(walletContractHex)
    .endCell();
}

export const createDeployParams = (params, offchainUri) => {
  return {
    code: mintContractHex,
    data: initData(params.owner, params.onchainMetaData, offchainUri),
    deployer: params.owner,
    value: toNano(0.25),
    message: mintBody(params.owner, params.amountToMint, toNano(0.2), 0),
  };
};
