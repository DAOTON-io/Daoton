import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Cell } from "ton";
import { beginCell, Address, comment, Contract, ContractProvider, ContractState, openContract, storeMessage, toNano } from "ton-core";
import { Maybe } from "ton-core/dist/utils/maybe";
import Counter from "./counter.ts"; // this is the interface class we just implemented

export default async function getCurrentValue(address) {
  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  // open Counter instance by address
  const counterAddress = Address.parse(address); // replace with your address from step 8
  const counter = new Counter(counterAddress);
  const counterContract = open(counter, client);

  // call the getter on chain
  const counterValue = await counterContract.getCounter();
  return counterValue;
}

const open = <T extends Contract>(src: T, client: TonClient) => {
  return openContract(src, (args) => {
    return createProvider(client, args.address, args.init);
  });
};

function createProvider(client: TonClient, address: Address, init: { code: Cell | null; data: Cell | null } | null): ContractProvider {
  return {
    async getState(): Promise<ContractState> {
      let state = await client.getContractState(address);
      let balance = state.balance;
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
      let method = await client.callGetMethod(address, name, args);
      return { stack: method.stack };
    },
    async external(message) {
      //
      // Resolve init
      //

      let neededInit: { code: Cell | null; data: Cell | null } | null = null;
      if (init && !(await client.isContractDeployed(address))) {
        neededInit = init;
      }

      //
      // Send package
      //

      // eslint-disable-next-line no-restricted-globals
      const ext = external({
        to: address,
        init: neededInit ? { code: neededInit.code, data: neededInit.data } : null,
        body: message,
      });
      let boc = beginCell().store(storeMessage(ext)).endCell().toBoc();
      await client.sendFile(boc);
    },
    async internal(via, message) {
      // Resolve init
      let neededInit: { code: Cell | null; data: Cell | null } | null = null;
      if (init && !(await client.isContractDeployed(address))) {
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
        body = comment(message.body);
      } else if (message.body) {
        body = message.body;
      }

      // Send internal message
      await via.send({
        to: address,
        value,
        bounce,
        sendMode: message.sendMode,
        init: neededInit,
        body,
      });
    },
  };
}
