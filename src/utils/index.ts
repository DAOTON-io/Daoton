/* eslint-disable @typescript-eslint/no-unused-vars */
import { TonClient, Cell } from "ton";
import { beginCell, Address, comment, Contract, ContractProvider, ContractState, openContract, storeMessage, toNano } from "ton-core";
import { Maybe } from "ton-core/dist/utils/maybe";

export const open = <T extends Contract>(src: T, client: TonClient) => {
  return openContract(src, (args) => {
    return createProvider(client, args.address, args.init as any);
  });
};

const createProvider = (client: TonClient, address: Address, init: { code: Cell | null; data: Cell | null } | null): ContractProvider => {
  return {
    async getState(): Promise<ContractState> {
      let state = await client.getContractState(address as any);
      let balance: any = state.balance;
      let last = state.lastTransaction ? { lt: BigInt(state.lastTransaction.lt), hash: Buffer.from(state.lastTransaction.hash, "base64") } : null;
      let storage:
        | {
            type: "uninit";
          }
        | {
            type: "active";
            code: Maybe<Buffer>;
            data: Maybe<Buffer>;
          }
        | {
            type: "frozen";
            stateHash: Buffer;
          };
      if (state.state === "active") {
        storage = {
          type: "active",
          code: state.code ? state.code : null,
          data: state.data ? state.data : null,
        };
      } else if (state.state === "uninitialized") {
        storage = {
          type: "uninit",
        };
      } else if (state.state === "frozen") {
        storage = {
          type: "frozen",
          stateHash: Buffer.alloc(0),
        };
      } else {
        throw Error("Unsupported state");
      }
      return {
        balance,
        last,
        state: storage,
      };
    },
    async get(name, args) {
      let method = await client.callGetMethod(address as any, name, args);
      return { stack: method.stack } as any;
    },
    async external(message) {
      //
      // Resolve init
      //

      let neededInit: { code: Cell | null; data: Cell | null } | null = null;
      if (init && !(await client.isContractDeployed(address as any))) {
        neededInit = init;
      }

      //
      // Send package
      //

      // eslint-disable-next-line no-restricted-globals
      const ext = {};
      let boc = beginCell()
        .store(storeMessage(ext as any))
        .endCell()
        .toBoc();
      await client.sendFile(boc);
    },
    async internal(via, message) {
      // Resolve init
      let neededInit: { code: Cell | null; data: Cell | null } | null = null;
      if (init && !(await client.isContractDeployed(address as any))) {
        neededInit = init;
      }

      // Resolve bounce
      let bounce = true;
      if (message.bounce !== null && message.bounce !== undefined) {
        bounce = message.bounce;
      }

      // Resolve value
      let value: bigint;
      if (typeof message.value === "string") {
        value = toNano(message.value);
      } else {
        value = message.value;
      }

      // Resolve body
      let body: Cell | null = null;
      if (typeof message.body === "string") {
        body = comment(message.body) as any;
      } else if (message.body) {
        body = message.body as any;
      }

      // Send internal message
      await via.send({
        to: address,
        value,
        bounce,
        sendMode: message.sendMode,
        init: neededInit as any,
        body: body as any,
      });
    },
  };
};
