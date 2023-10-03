import * as path from "path";
import * as fs from "fs-extra";
import solc, { Contract, ContractInput } from "solc";

const inboxPath: string = path.resolve(__dirname, "contracts", "Inbox.sol");
const source: string = fs.readFileSync(inboxPath, "utf-8");

var input: ContractInput = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var contract: Contract = JSON.parse(solc.compile(JSON.stringify(input)))
  .contracts["Inbox.sol"].Inbox;

console.log(contract);

export default contract;
