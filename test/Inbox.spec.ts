import ganache from "ganache";
import * as fs from "fs";
import { Contract, Web3 } from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";
import { Abi } from "solc";

import compile from "../src/scripts/compile";

const MESSAGE = "demo";

const web3: Web3<RegisteredSubscription> = new Web3(ganache.provider());
let accounts: string[];
let inbox: Contract<Abi>;

beforeAll(async () => {
  await compile();
});

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  const { abi, bytecode } = JSON.parse(
    fs.readFileSync("dist/contracts/Inbox.json") as unknown as string
  );

  const args = [MESSAGE];
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: args as [] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("should deploy a contract", () => {
    expect(inbox.options.address).toBeDefined();
  });

  it("should has a default message", async () => {
    const message: string = await inbox.methods.message().call();
    expect(message).toBe(MESSAGE);
  });

  it("should be able to change message", async () => {
    const msg = "foo";
    // @ts-ignore
    await inbox.methods.setMessage(msg).send({ from: accounts[0] });
    const message: string = await inbox.methods.message().call();
    expect(message).toBe(msg);
  });
});
