import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "ton-core";

export default class Counter implements Contract {
  static createForDeploy(code: Cell, initialCounterValue: number): Counter {
    const data = beginCell()
      .storeUint(initialCounterValue, 64)
      .endCell();
    const workchain = 0; // deploy to workchain 0
    const address = contractAddress(workchain, { code, data });
    return new Counter(address, { code, data });
  }
  
  constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

  async sendDeploy(provider: ContractProvider, via: Sender) {
    await provider.internal(via, {
      value: "0.01", // send 0.01 TON to contract for rent
      bounce: false
    });
  }
  // export default class Counter implements Contract {

  async getCounter(provider: ContractProvider) {
    const { stack } = await provider.get("get_total", []);
    const yes = stack.readBigNumber()
    const no = stack.readBigNumber()
    const veto = stack.readBigNumber()
    const abstain = stack.readBigNumber()
    const time = stack.readBigNumber()
    const total = yes + no + veto + abstain
    return [yes.toString(), no.toString(), veto.toString(), abstain.toString(), Number(time), total.toString()];
  }
  
  // export default class Counter implements Contract {

  async sendIncrement(provider: ContractProvider, via: Sender) {
    const messageBody = beginCell()
      .storeUint(1, 32) // op (op #1 = increment)
      .storeUint(0, 64) // query id
      .endCell();
    await provider.internal(via, {
      value: "0.002", // send 0.002 TON for gas
      body: messageBody
    });
  }
}