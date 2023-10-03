import * as fs from "node:fs/promises";
import solc, { ContractInput } from "solc";

async function main() {
  const sourceCode: string = await fs.readFile(
    "src/contracts/Inbox.sol",
    "utf8"
  );
  const { abi, bytecode } = compile(sourceCode, "Inbox");
  const artifact = JSON.stringify({ abi, bytecode }, null, 2);
  await fs.mkdir("dist/contracts", { recursive: true });
  await fs.writeFile("dist/contracts/Inbox.json", artifact);
}

function compile(sourceCode: string, contractName: string) {
  const input: ContractInput = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  };
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

(async () => {
  await main();
})();

export default main;
