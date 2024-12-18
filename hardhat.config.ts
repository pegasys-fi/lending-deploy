import "@nomiclabs/hardhat-ethers";
import "@matterlabs/hardhat-zksync";
import "hardhat-deploy";
import "@typechain/hardhat";
import dotenv from "dotenv";
import { DEFAULT_NAMED_ACCOUNTS } from "./helpers/constants";

dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const config = {
  defaultNetwork: "zkSyncTestnet",
  zksolc: {
    version: "1.5.3",
    settings: {
      optimizer: {
        enabled: true,
      },
        libraries: {
              "contracts/lending-core/protocol/libraries/logic/BorrowLogic.sol": {
                "BorrowLogic": "0x32386b53d961D38246FEcE4042F0aB39acb21B81"
              },
              "contracts/lending-core/protocol/libraries/logic/SupplyLogic.sol": {
                "SupplyLogic": "0x3704598956c74fE4D48C6a797b71AC59D369c3Bb"
              },
              "contracts/lending-core/protocol/libraries/logic/PoolLogic.sol": {
                "PoolLogic": "0x9620FabB9cc724D403621783234f87483dD290E3"
              },
              "contracts/lending-core/protocol/libraries/logic/BridgeLogic.sol": {
                "BridgeLogic": "0xA659b1916061a388A4f654A646FBa3018a800F6A"
              },
              "contracts/lending-core/protocol/libraries/logic/EModeLogic.sol": {
                "EModeLogic": "0xa0b82509e7019af6C18505238A4A75A0E6C89c6c"
              },
              "contracts/lending-core/protocol/libraries/logic/FlashLoanLogic.sol": {
                "FlashLoanLogic": "0x903c49Ce08cC2Bc4219E14f8aCd0629c159D8684"
              },
              "contracts/lending-core/protocol/libraries/logic/LiquidationLogic.sol": {
                "LiquidationLogic": "0xc69637317CB8eBd3EcB3F1E21E5b8CF6d10d178d"
              },
              "contracts/lending-core/protocol/libraries/logic/ConfiguratorLogic.sol": {
                "ConfiguratorLogic": "0x390fFB976A2ea2680B1E9ee9046930774df602Aa"
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