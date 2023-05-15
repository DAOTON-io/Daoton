import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "ton-core";
import { DaoContent } from "./models/DaoContent";
import daoton from "../contracts/daoton.contract.json";
import { _parseGetMethodCall, cellToAddress, makeGetCall, makeGetCallWithData, readDaoMetadata, readProposalMetadata } from "./make-get-call";
import { Dao } from "../../../utils/types";
import { TonClient } from "ton";
import BN from "bn.js";

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

  getDaoData = async (provider: ContractProvider): Promise<any> => {
    const { stack }: any = await provider.get("get_dao_data", []);

    // dao_type_id , token_contract , nft_contract , content , proposal seq
    const data: any = _parseGetMethodCall(stack);
    const daoTypeId: number = data[0].toNumber();
    const tokenContract = cellToAddress(data[1]);
    const nftContract = cellToAddress(data[2]);
    const readContent = readDaoMetadata(data[3]);
    const sequence: number = data[4].toNumber();

    const content = (await readContent).metadata as any;

    return { address: this.address.toString(), daoTypeId, tokenContract, nftContract, content, sequence };
  };

  private getProposalById = async (id: number, client: TonClient) => {
    const proposal: any = await makeGetCallWithData(
      this.address as any,
      "get_proposal",
      [new BN(id)],
      ([data]) => {
        return data;
      },
      client
    );

    const owner = "0:" + proposal[0]?.toString("hex");
    const balance: number = proposal[1]?.toNumber();
    const yes = proposal[2]?.toNumber();
    const no = proposal[3]?.toNumber();
    const abstain = proposal[4]?.toNumber();
    const timestamp = proposal[5]?.toNumber();
    const successThreshold = proposal[6]?.toNumber();
    const failThreshold = proposal[7]?.toNumber();
    const vote = proposal[8];
    const isRelatedWithNft = proposal[9]?.toNumber();

    const readContent = readProposalMetadata(proposal[10]);

    const content = (await readContent).metadata as any;

    return { owner, balance, yes, no, abstain, timestamp, successThreshold, failThreshold, vote, isRelatedWithNft, content };
  };

  getProposalList = async (provider: ContractProvider, client: TonClient, seq: number) => {
    try {
      const proposalPromises = [];

      for (let i = 0; i < seq; i++) {
        proposalPromises.push(this.getProposalById(i, client));
      }

      const proposalList = await Promise.all(proposalPromises);

      return proposalList;
    } catch (err) {
      console.log("err", err);
    }
  };
}
