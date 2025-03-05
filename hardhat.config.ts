import "@nomiclabs/hardhat-ethers";
import "@matterlabs/hardhat-zksync";
import "hardhat-deploy";
import "@typechain/hardhat";
import dotenv from "dotenv";
import { DEFAULT_NAMED_ACCOUNTS } from "./helpers/constants";

dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const config = {
  defaultNetwork: "zkSysTestnet",
  zksolc: {
    version: "1.5.3",
    settings: {
      optimizer: {
        enabled: true,
      },
        libraries: {
              "contracts/lending-core/protocol/libraries/logic/BorrowLogic.sol": {
                "BorrowLogic": "0x2E238EfF9Ebf23DcEe2196Ea5EfB3E16307fF264"
              },
              "contracts/lending-core/protocol/libraries/logic/FlashLoanLogic.sol": {
                "FlashLoanLogic": "0x4F3C90eB0D63C692EA59d2Ab2987C485eC8E1a11"
              },
              "contracts/lending-core/protocol/libraries/logic/PoolLogic.sol": {
                "PoolLogic": "0x287b79720179D767251B6170fcF5D74C7950Fd8c"
              },
              "contracts/lending-core/protocol/libraries/logic/SupplyLogic.sol": {
                "SupplyLogic": "0x5A74Db5df74bE3ffe97874582c633444B685F8Aa"
              },
              "contracts/lending-core/protocol/libraries/logic/EModeLogic.sol": {
                "EModeLogic": "0x26bF8221838f9FCe2d954567ecc4ac64B48a7453"
              },
              "contracts/lending-core/protocol/libraries/logic/BridgeLogic.sol": {
                "BridgeLogic": "0xCbA8A50575546eF7d278ab3aedb2f6464BA74De3"
              },
              "contracts/lending-core/protocol/libraries/logic/LiquidationLogic.sol": {
                "LiquidationLogic": "0x92173b82F2D60D9002FC22f45dA3602A52a965d3"
              },
              "contracts/lending-core/protocol/libraries/logic/ConfiguratorLogic.sol": {
                "ConfiguratorLogic": "0x117359aE22d7be8B2A411565B06CE178FD78cB0e"
              }
            }
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
    ],
  },
  namedAccounts: {
    ...DEFAULT_NAMED_ACCOUNTS,
  },
  networks: {
    zkSyncTestnet: {
      url: 'https://sepolia.era.zksync.dev',
      chainId: 300,
      gasPrice: 10000000,
      accounts: [PRIVATE_KEY],
      live: true,
      zksync: true,
      verifyURL: 'https://explorer.sepolia.era.zksync.dev/contract_verification',
      ethNetwork: 'sepolia',
    },
    zkSysTestnet: {
      url: 'https://rpc-test-zk.syscoin.org/',
      chainId: 5701,
      gasPrice: 10000000,
      accounts: [PRIVATE_KEY],
      live: false,
      zksync: true,
      verifyURL: 'https://explorer-test-zk.syscoin.org/contract_verification',
      ethNetwork: 'sepolia',
    },
    localhost: {
      url: 'http://127.0.0.1:8011/',
      chainId: 260,
      zksync: true,
      live: false,
      ethNetwork: "http://127.0.0.1:8545",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
      ],
      gasPrice: "auto",
      initialBaseFeePerGas: "0",
      blockGasLimit: 12450000,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      saveDeployments: true,
      allowUnlimitedContractSize: true,
      tags: ["local"],
    }
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts-zk",
    cache: "./cache-zk"
  }
};

export default config;