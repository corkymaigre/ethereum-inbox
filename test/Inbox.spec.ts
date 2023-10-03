import assert from "assert";
import ganache from "ganache";
import { Web3 } from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

const web3: Web3<RegisteredSubscription> = new Web3(ganache.provider());

let accounts: string[];

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
});

describe("Inbox", () => {
  it("should deploy a contract", () => {
    console.log(accounts);
  });
});
