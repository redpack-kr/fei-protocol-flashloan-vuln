/** @type import('hardhat/config').HardhatUserConfig */
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import "solidity-coverage";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
      hardfork: "berlin", // use berlin in test to avoid issues with gas price 0
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        accountsBalance: "100000000000000000000000000000000000",
      },
    },
    ethereum: {
      url: process.env.ETH_MAINNET_RPC,
      accounts: [process.env.ETH_MAINNET_PRIVATE_KEY],
    },
    eth_mainnetfork: {
      url: process.env.FORK_RPC,
      accounts: [process.env.ETH_MAINNET_PRIVATE_KEY],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: {
    version: "0.6.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
      evmVersion: "istanbul",
      outputSelection: {
        "*": {
          "": ["ast"],
          "*": [
            "evm.bytecode.object",
            "evm.deployedBytecode.object",
            "abi",
            "evm.bytecode.sourceMap",
            "evm.deployedBytecode.sourceMap",
            "metadata",
          ],
        },
      },
    },
  },
  paths: {
    sources: "./solidity/contracts/",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  typechain: {
    outDir: "./typechain",
    target: process.env.TYPECHAIN_TARGET || "ethers-v5",
  },
  mocha: {
    timeout: 100000,
  },
}