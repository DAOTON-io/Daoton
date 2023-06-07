// ref https://github.com/ton-blockchain/minter/blob/main/src/lib/make-get-call.ts

import { Address, Cell, TonClient, Slice } from "ton";
import BN from "bn.js";
import { sha256 } from "../../token-minter/deployer";

function _prepareParams(params: any[] = []) {
  return params.map((p) => {
    if (p instanceof Cell) {
      return ["tvm.Slice", p.toBoc({ idx: false }).toString("base64")];
    } else if (p instanceof BN) {
      return ["num", p.toString(10)];
    }

    throw new Error("unknown type!");
  });
}

export type GetResponseValue = Cell | BN | null;

export function cellToAddress(s: GetResponseValue): Address {
  return (s as Cell).beginParse().readAddress() as Address;
}

export function cellToContent(s: GetResponseValue): Slice {
  return (s as Cell).beginParse().readRef() as Slice;
}

export const daoMetadata: any = {
  name: "utf8",
  description: "utf8",
  image: "utf8",
};

function parseDaoOnchainMetadata(contentSlice: Slice): {
  metadata: { [s in any]?: string };
  isJettonDeployerFaultyOnChainData: boolean;
} {
  // Note that this relies on what is (perhaps) an internal implementation detail:
  // "ton" library dict parser converts: key (provided as buffer) => BN(base10)
  // and upon parsing, it reads it back to a BN(base10)
  // tl;dr if we want to read the map back to a JSON with string keys, we have to convert BN(10) back to hex
  const toKey = (str: string) => new BN(str, "hex").toString(10);
  const KEYLEN = 256;

  let isJettonDeployerFaultyOnChainData = false;

  const dict = contentSlice.readDict(KEYLEN, (s) => {
    let buffer = Buffer.from("");

    const sliceToVal = (s: Slice, v: Buffer, isFirst: boolean) => {
      s.toCell().beginParse();
      if (isFirst && s.readUint(8).toNumber() !== 0x00) throw new Error("Only snake format is supported");

      v = Buffer.concat([v, s.readRemainingBytes()]);
      if (s.remainingRefs === 1) {
        v = sliceToVal(s.readRef(), v, false);
      }

      return v;
    };

    if (s.remainingRefs === 0) {
      isJettonDeployerFaultyOnChainData = true;
      return sliceToVal(s, buffer, true);
    }

    return sliceToVal(s.readRef(), buffer, true);
  });

  const res: { [s in any]?: string } = {};

  Object.keys(daoMetadata).forEach((k) => {
    const val = dict.get(toKey(sha256(k).toString("hex")))?.toString(daoMetadata[k as any]);
    if (val) res[k as any] = val;
  });

  return {
    metadata: res,
    isJettonDeployerFaultyOnChainData,
  };
}

function parseProposalOnchainMetadata(contentSlice: Slice): {
  metadata: { [s in any]?: string };
  isJettonDeployerFaultyOnChainData: boolean;
} {
  // Note that this relies on what is (perhaps) an internal implementation detail:
  // "ton" library dict parser converts: key (provided as buffer) => BN(base10)
  // and upon parsing, it reads it back to a BN(base10)
  // tl;dr if we want to read the map back to a JSON with string keys, we have to convert BN(10) back to hex
  const toKey = (str: string) => new BN(str, "hex").toString(10);
  const KEYLEN = 256;

  let isJettonDeployerFaultyOnChainData = false;

  const dict = contentSlice.readDict(KEYLEN, (s) => {
    let buffer = Buffer.from("");

    const sliceToVal = (s: Slice, v: Buffer, isFirst: boolean) => {
      s.toCell().beginParse();
      if (isFirst && s.readUint(8).toNumber() !== 0x00) throw new Error("Only snake format is supported");

      v = Buffer.concat([v, s.readRemainingBytes()]);
      if (s.remainingRefs === 1) {
        v = sliceToVal(s.readRef(), v, false);
      }

      return v;
    };

    if (s.remainingRefs === 0) {
      isJettonDeployerFaultyOnChainData = true;
      return sliceToVal(s, buffer, true);
    }

    return sliceToVal(s.readRef(), buffer, true);
  });

  const res: { [s in any]?: string } = {};

  const proposalMetadata: any = {
    text: "utf8",
  };

  Object.keys(proposalMetadata).forEach((k) => {
    const val = dict.get(toKey(sha256(k).toString("hex")))?.toString(daoMetadata[k as any]);
    if (val) res[k as any] = val;
  });

  return {
    metadata: res,
    isJettonDeployerFaultyOnChainData,
  };
}

export async function readDaoMetadata(contentCell: Cell): Promise<{
  persistenceType: any;
  metadata: { [s in any]?: string };
}> {
  const contentSlice = contentCell.beginParse();

  return {
    persistenceType: "onchain",
    ...parseDaoOnchainMetadata(contentSlice),
  };
}

// @to-do remove and refactor

export async function readProposalMetadata(contentCell: Cell): Promise<{
  persistenceType: any;
  metadata: { [s in any]?: string };
}> {
  const contentSlice = contentCell.beginParse();

  return {
    persistenceType: "onchain",
    ...parseProposalOnchainMetadata(contentSlice),
  };
}

export function _parseGetMethodCall(stack: [["num" | "cell" | "list", any]]): GetResponseValue[] {
  return stack.map(([type, val]) => {
    switch (type) {
      case "num":
        return new BN(val.replace("0x", ""), "hex");
      case "cell":
        return Cell.fromBoc(Buffer.from(val.bytes, "base64"))[0];
      case "list":
        if (val.elements.length === 0) {
          return null;
        } else {
          throw new Error("list parsing not supported");
        }
      default:
        throw new Error(`unknown type: ${type}, val: ${JSON.stringify(val)}`);
    }
  });
}

export async function makeGetCall<T>(address: Address | undefined, name: string, params: any[], parser: (stack: GetResponseValue[]) => T, tonClient: TonClient) {
  const { stack } = await tonClient.callGetMethod(address!, name, _prepareParams(params));

  return parser(_parseGetMethodCall(stack as [["num" | "cell", any]]));
}

export async function makeGetCallWithData<T>(address: Address | undefined, name: string, params: any[], parser: (stack: GetResponseValue[]) => T, tonClient: TonClient) {
  const { stack } = await tonClient.callGetMethod(address!, name, _prepareParams(params));

  return _parseGetMethodCall(stack as [["num" | "cell", any]]);
}
