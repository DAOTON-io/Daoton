import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "ton-core";
import { DaoContent } from "./models/DaoContent";
import daoton from "../contracts/daoton.contract.json";
import { _parseGetMethodCall, cellToAddress, readDaoMetadata } from "./make-get-call";
import { Dao } from "../../../utils/types";

export default class DaoContract implements Contract {
  static createForDeploy(code: Cell, daoTypeId: number, tokenContract: Address, nftCollection: Address, daoContent: DaoContent): DaoContract {
    const data = beginCell()
      .storeUint(daoTypeId, 16)
      .storeAddress(tokenContract)
      .storeAddress(nftCollection)
      .storeRef(
        beginCell()
          .storeBuffer(Buffer.from(JSON.stringify(daoContent)))
          .endCell()
      )
      .storeUint(0, 32) // initial proposal count
      .storeDict(null) // proposals
      .endCell();

    const workchain = 0; // deploy to workchain 0
    const address = contractAddress(workchain, { code, data });
    return new DaoContract(address, { code, data });
  }

  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

  async sendDeploy(provider: ContractProvider, via: Sender) {
    const daotonAddress = Address.parse(daoton.address);

    const body = beginCell().storeUint(0, 32).storeAddress(this.address).storeAddress(daotonAddress).endCell();

    await provider.internal(via, {
      value: "0.02", // send 0.01 TON to contract for rent
      bounce: false,
      body,
    });
  }

  getDaoData = async (provider: ContractProvider): Promise<Dao> => {
    const { stack }: any = await provider.get("get_dao_data", []);

    // dao_type_id , token_contract , nft_contract , content , proposal seq
    const data: any = _parseGetMethodCall(stack);
    const daoTypeId: number = data[0].toNumber();
    const tokenContract = cellToAddress(data[1]);
    const nftContract = cellToAddress(data[2]);
    const readContent = readDaoMetadata(data[3]);

    const content = (await readContent).metadata as any;

    return { address: this.address.toString(), daoTypeId, tokenContract, nftContract, content };
  };

  // async sendProposal(provider: ContractProvider, via: Sender) {
  //   const daoContract = Address.parse("EQCeq1eEbTzsc1BWdgyPH_Q_vEk8miKjDVXKk6ZwCAdHVxj9");

  //   // create proposal
  //   const messageBody = beginCell()
  //     .storeUint(1, 32) // op (op #1 = create proposal)
  //     .storeCoins(toNano("0.01")) // balance
  //     .storeUint(Date.now(), 64) // timestamp
  //     .storeCoins(100) // success threshold
  //     .storeCoins(20) // fail threshold
  //     .storeUint(0, 2)
  //     .storeRef(
  //       beginCell()
  //         .storeBuffer(Buffer.from(JSON.stringify({ name: "xxxx" })))
  //         .endCell()
  //     )
  //     .storeAddress(daoContract)
  //     .endCell();

  //   // // vote;
  //   // const messageBody = beginCell()
  //   //   .storeUint(1, 32) // op (op #2 = vote)
  //   //   .storeUint(1, 256) // propsal_id
  //   //   .endCell();

  //   // // execute
  //   // const messageBody = beginCell()
  //   //   .storeUint(3, 32) // op (op #3 = execute)
  //   //   .storeUint(0, 32) // proposal_id
  //   //   .storeAddress(Address.parse("kQDauKVUskEVeMtynOZpO0s7ae8cKza8abvvfOB1QQOtJHXH"))
  //   //   .endCell();

  //   await provider.internal(via, {
  //     value: "0.02", // send 0.002 TON for gas
  //     body: messageBody,
  //   });
  // }

  // async vote(provider: ContractProvider, via: Sender) {
  //   const messageBody = beginCell()
  //     .storeUint(2, 32) // op (op #2 = vote)
  //     .storeUint(0, 32) // propsal_id
  //     .storeUint(1, 2) // vote
  //     .endCell();

  //   await provider.internal(via, {
  //     value: "0.01", // send 0.002 TON for gas
  //     body: messageBody,
  //   });
  // }

  // getProposal = async (provider: ContractProvider, id: number) => {
  //   const { stack } = await provider.get("get_proposal", [
  //     {
  //       type: "int",
  //       value: BigInt(id),
  //     },
  //   ]);

  //   // const { stack } = await provider.get("get_proposal", []);

  //   console.log(stack);

  //   // console.log("PROPS:", stack.readCell());
  //   return stack;
  // };
}
