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
        "contracts/lending-core/protocol/libraries/logic/PoolLogic.sol": {
          "PoolLogic": "0x7753e0b332EA06bCb48772893e125893c1e1a1cD"
        },
        "contracts/lending-core/protocol/libraries/logic/BorrowLogic.sol": {
          "BorrowLogic": "0xf5ae95B5891E6C04927D8662B26996bC8876C456"
        },
        "contracts/lending-core/protocol/libraries/logic/LiquidationLogic.sol": {
          "LiquidationLogic": "0x333462C4427FA2f8ce47F1eb829362d2c2d0b470"
        },
        "contracts/lending-core/protocol/libraries/logic/BridgeLogic.sol": {
          "BridgeLogic": "0xA3528CF78AcBF3e70BCED7A15070865Af3fA0C53"
        },
        "contracts/lending-core/protocol/libraries/logic/EModeLogic.sol": {
          "EModeLogic": "0xaD7c3775C38Cb818F19B505E02F99daB3601adce"
        },
        "contracts/lending-core/protocol/libraries/logic/SupplyLogic.sol": {
          "SupplyLogic": "0x572CDEFCC62897BCe3608f4ae5db08B2229Eb4db"
        },
        "contracts/lending-core/protocol/libraries/logic/FlashLoanLogic.sol": {
          "FlashLoanLogic": "0x57e2A973b46C1d2cFE132cb3e8423c89046e223c"
        },
        "contracts/lending-core/protocol/libraries/logic/ConfiguratorLogic.sol": {
          "ConfiguratorLogic": "0x897e879989a706c648463E7Ff7D654a8AfD6A667"
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