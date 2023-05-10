import { Contract, ContractProvider, Cell, Address } from "ton-core";
import { makeGetCall } from "./make-get-call";
import BN from "bn.js";
import { TonClient } from "ton";

export default class DaoTonContract implements Contract {
  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

  getDaoList = async (provider: ContractProvider, client: TonClient) => {
    try {
      const { stack }: any = await provider.get("get_current_data", []);

      const seq = parseInt(stack[1][1]);
      const daoPromises = [];

      for (let i = 0; i < seq; i++) {
        daoPromises.push(this.getDaoById(i, client));
      }

      console.log("dao", daoPromises);

      Promise.all(daoPromises)
        .then((data) => {
          console.log("data", data);
        })
        .catch((err) => {
          console.log("err", err);
        });

      // console.log("daodata", "0:" + daoData?.toString("hex"));

      return stack;
    } catch (err) {
      console.log("err", err);
    }
  };

  getDaoById = async (id: number, client: TonClient) => {
    const daoContract = await makeGetCall(
      this.address as any,
      "get_dao",
      [new BN(id)],
      ([data]) => {
        return data;
      },
      client
    );

    return daoContract;
  };
}
