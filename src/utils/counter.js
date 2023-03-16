import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "ton-core";

export default class Counter {
  static createForDeploy(code, initialCounterValue) {
    const data = beginCell().storeUint(initialCounterValue, 64).endCell();
    const workchain = 0; // deploy to workchain 0
    const address = contractAddress(workchain, { code, data });
    return new Counter(address, { code, data });
  }

  constructor(address, init) {}

  async sendDeploy(provider, via) {
    await provider.internal(via, {
      value: "0.01", // send 0.01 TON to contract for rent
      bounce: false,
    });
  }
  // export default class Counter implements Contract {

  async getCounter(provider) {
    const { stack } = await provider.get("get_total", []);
    const yes = stack.readBigNumber();
    const no = stack.readBigNumber();
    const time = stack.readBigNumber();
    const total = yes + no;
    return [yes.toString(), no.toString(), time.toString(), total.toString()];
  }

  // export default class Counter implements Contract {

  async sendIncrement(provider, via) {
    const messageBody = beginCell()
      .storeUint(1, 32) // op (op #1 = increment)
      .storeUint(0, 64) // query id
      .endCell();
    await provider.internal(via, {
      value: "0.002", // send 0.002 TON for gas
      body: messageBody,
    });
  }
}
