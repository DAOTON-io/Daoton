import { Contract, ContractProvider, Address, Cell } from "ton-core";

export default class DaoTonContract implements Contract {
  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

  getDaoList = async (provider: ContractProvider) => {
    try {
      const { stack } = await provider.get("get_current_data", []);
      console.log(stack);
      // console.log("dao type id: ", stack.readBigNumber().toString());
      // console.log("token address: ", stack.readAddress().toString());
      // console.log("nft address : ", stack.readAddress().toString());
      // console.log("content :", stack.readBuffer().toString());
      // console.log("last proposal id :", stack.readBigNumber().toString());

      return stack;
    } catch {}
  };
}
