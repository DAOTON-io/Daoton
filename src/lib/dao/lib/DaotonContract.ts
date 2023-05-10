import { Contract, ContractProvider, Cell, Address } from "ton-core";
import { makeGetCall } from "./make-get-call";
import BN from "bn.js";
import { TonClient } from "ton";

export default class DaoTonContract implements Contract {
  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

  private getDaoById = async (id: number, client: TonClient) => {
    const daoContract = await makeGetCall(
      this.address as any,
      "get_dao",
      [new BN(id)],
      ([data]) => {
        return data;
      },
      client
    );

    return "0:" + daoContract?.toString("hex");
  };

  getDaoList = async (provider: ContractProvider, client: TonClient) => {
    try {
      const { stack }: any = await provider.get("get_current_data", []);

      const seq = parseInt(stack[1][1]);
      const daoPromises = [];

      for (let i = 0; i < seq; i++) {
        daoPromises.push(this.getDaoById(i, client));
      }

      const daoList = await Promise.all(daoPromises);

      console.log(daoList);

      // user friendly
      return daoList;
    } catch (err) {
      console.log("err", err);
    }
  };
}
