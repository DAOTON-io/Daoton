import { fetchDecimalsOffchain, toDecimalsBN } from "../../utils/utils";
import { Address, toNano, contractAddress, Cell } from "ton";
import { createDeployParams } from "./deployer";
import { GenerateTokenType } from "../../utils/types";

export const mintToken = async (address: string, data: GenerateTokenType) => {
  const editedAddress = Address.parse(address);

  let dc = data.decimal;
  if (data.offchainUri) {
    let res = await fetchDecimalsOffchain(data.offchainUri.replace("ipfs://", "https://ipfs.io/ipfs/"));
    dc = res.decimals;
  }

  const params = {
    owner: editedAddress,
    onchainMetaData: {
      name: data.name,
      symbol: data.symbol,
      description: data.description,
      decimals: dc.toFixed(0),
      image: data.image,
      // isPausable: data.isPausable,
    },
    // offchainUri: data.offchainUri,
    amountToMint: toDecimalsBN(data.amount, dc),
  };

  const deployParams = createDeployParams(params, data.offchainUri);

  const contractAddressHex = contractAddress({
    workchain: 0,
    initialCode: deployParams.code,
    initialData: deployParams.data,
  }).toString();

  console.log("contractAddressHex", contractAddressHex);

  const state_init = new Cell();
  state_init.bits.writeUint(6, 5);
  state_init.refs.push(deployParams.code);
  state_init.refs.push(deployParams.data);

  const aa = state_init.toBoc();
  const bb = aa.toString("base64");

  const py = deployParams.message.toBoc();

  const tx = {
    validUntil: Date.now() + 1000000,
    messages: [
      {
        address: contractAddressHex,
        amount: toNano(0.25).toNumber().toString(),
        stateInit: bb,
        payload: py.toString("base64"),
      },
    ],
  };

  return tx;
};
