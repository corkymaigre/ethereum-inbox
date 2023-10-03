import assert from "assert";
import ganache from "ganache";
import * as fs from "fs";
import { Contract, FMT_BYTES, FMT_NUMBER, Web3 } from "web3";
import {
  RegisteredSubscription,
  SendTransactionEvents,
} from "web3/lib/commonjs/eth.exports";
import Web3PromiEvent from "web3-core-promievent";

import compile from "../src/scripts/compile";

const web3: Web3<RegisteredSubscription> = new Web3(ganache.provider());
let accounts: string[];
let inbox: Web3PromiEvent<
  Contract<any>,
  SendTransactionEvents<{
    readonly number: FMT_NUMBER.BIGINT;
    readonly bytes: FMT_BYTES.HEX;
  }>
>;

beforeAll(async () => {
  await compile();
});

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  const { abi, bytecode } = JSON.parse(
    fs.readFileSync("dist/contracts/Inbox.json") as unknown as string
  );

  const args = ["Hello"];
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: args as [] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("should deploy a contract", () => {
    console.log(inbox);
  });
});
