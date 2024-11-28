import {
  // DETERMINISTIC_DEPLOYMENT,
  // DETERMINISTIC_FACTORIES,
  // ETHERSCAN_KEY,
  getCommonNetworkConfig,
  getZkSyncTestnetNetworkConfig,
  hardhatNetworkSettings,
  loadTasks,
} from "./helpers/hardhat-config-helpers";
import {
  eEthereumNetwork
} from "./helpers/types";
import { DEFAULT_NAMED_ACCOUNTS } from "./helpers/constants";

import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "hardhat-dependency-compiler";
import "@nomicfoundation/hardhat-chai-matchers";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const TASK_FOLDERS = ["misc", "market-registry"];

// Prevent to load tasks before compilation and typechain
if (!SKIP_LOAD) {
  loadTasks(TASK_FOLDERS);
}

export default {
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  zksolc: {
    version: "1.5.7.",
    compilerSource: "binary",
    settings: {
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.7.5",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  networks: {
    hardhat: hardhatNetworkSettings,
    localhost: {
      url: "http://127.0.0.1:8545",
      ...hardhatNetworkSettings,
    },
    tanenbaum: getCommonNetworkConfig(eEthereumNetwork.tanenbaum, 57000),
    rollux: getCommonNetworkConfig(eEthereumNetwork.rollux, 570),
    zkSyncTestnet: getZkSyncTestnetNetworkConfig(eEthereumNetwork.zkSyncTestnet, 300),
    sepolia: getCommonNetworkConfig(eEthereumNetwork.sepolia, 11155111),

  },
  namedAccounts: {
    ...DEFAULT_NAMED_ACCOUNTS,
  },
  mocha: {
    timeout: 0,
  },
  dependencyCompiler: {
    paths: [
      "@pollum-io/lending-core/contracts/protocol/configuration/PoolAddressesProviderRegistry.sol",
      "@pollum-io/lending-core/contracts/protocol/configuration/PoolAddressesProvider.sol",
      "@pollum-io/lending-core/contracts/misc/AaveOracle.sol",
      "@pollum-io/lending-core/contracts/protocol/tokenization/AToken.sol",
      "@pollum-io/lending-core/contracts/protocol/tokenization/DelegationAwareAToken.sol",
      "@pollum-io/lending-core/contracts/protocol/tokenization/StableDebtToken.sol",
      "@pollum-io/lending-core/contracts/protocol/tokenization/VariableDebtToken.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/logic/GenericLogic.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/logic/ValidationLogic.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/logic/ReserveLogic.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/logic/SupplyLogic.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/logic/EModeLogic.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/logic/BorrowLogic.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/logic/BridgeLogic.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/logic/FlashLoanLogic.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/logic/CalldataLogic.sol",
      "@pollum-io/lending-core/contracts/protocol/pool/Pool.sol",
      "@pollum-io/lending-core/contracts/protocol/pool/L2Pool.sol",
      "@pollum-io/lending-core/contracts/protocol/pool/PoolConfigurator.sol",
      "@pollum-io/lending-core/contracts/protocol/pool/DefaultReserveInterestRateStrategy.sol",
      "@pollum-io/lending-core/contracts/protocol/libraries/aave-upgradeability/InitializableImmutableAdminUpgradeabilityProxy.sol",
      "@pollum-io/lending-core/contracts/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy.sol",
      "@pollum-io/lending-core/contracts/deployments/ReservesSetupHelper.sol",
      "@pollum-io/lending-core/contracts/misc/AaveProtocolDataProvider.sol",
      "@pollum-io/lending-core/contracts/misc/L2Encoder.sol",
      "@pollum-io/lending-core/contracts/protocol/configuration/ACLManager.sol",
      "@pollum-io/lending-core/contracts/dependencies/weth/WETH9.sol",
      "@pollum-io/lending-core/contracts/mocks/helpers/MockIncentivesController.sol",
      "@pollum-io/lending-core/contracts/mocks/helpers/MockReserveConfiguration.sol",
      "@pollum-io/lending-core/contracts/mocks/oracle/CLAggregators/MockAggregator.sol",
      "@pollum-io/lending-core/contracts/mocks/tokens/MintableERC20.sol",
      "@pollum-io/lending-core/contracts/mocks/flashloan/MockFlashLoanReceiver.sol",
      "@pollum-io/lending-core/contracts/mocks/tokens/WETH9Mocked.sol",
      "@pollum-io/lending-core/contracts/mocks/upgradeability/MockVariableDebtToken.sol",
      "@pollum-io/lending-core/contracts/mocks/upgradeability/MockAToken.sol",
      "@pollum-io/lending-core/contracts/mocks/upgradeability/MockStableDebtToken.sol",
      "@pollum-io/lending-core/contracts/mocks/upgradeability/MockInitializableImplementation.sol",
      "@pollum-io/lending-core/contracts/mocks/helpers/MockPool.sol",
      "@pollum-io/lending-core/contracts/mocks/helpers/MockL2Pool.sol",
      "@pollum-io/lending-core/contracts/dependencies/openzeppelin/contracts/IERC20Detailed.sol",
      "@pollum-io/lending-core/contracts/dependencies/openzeppelin/contracts/IERC20.sol",
      "@pollum-io/lending-core/contracts/mocks/oracle/PriceOracle.sol",
      "@pollum-io/lending-core/contracts/mocks/tokens/MintableDelegationERC20.sol",
      "@pollum-io/lending-periphery/contracts/misc/UiPoolDataProviderV3.sol",
      "@pollum-io/lending-periphery/contracts/misc/WalletBalanceProvider.sol",
      "@pollum-io/lending-periphery/contracts/misc/WrappedTokenGatewayV3.sol",
      "@pollum-io/lending-periphery/contracts/misc/interfaces/IWETH.sol",
      "@pollum-io/lending-periphery/contracts/misc/UiIncentiveDataProviderV3.sol",
      "@pollum-io/lending-periphery/contracts/rewards/RewardsController.sol",
      "@pollum-io/lending-periphery/contracts/rewards/transfer-strategies/StakedTokenTransferStrategy.sol",
      "@pollum-io/lending-periphery/contracts/rewards/transfer-strategies/PullRewardsTransferStrategy.sol",
      "@pollum-io/lending-periphery/contracts/rewards/EmissionManager.sol",
      "@pollum-io/lending-periphery/contracts/mocks/WETH9Mock.sol",
      "@pollum-io/lending-periphery/contracts/mocks/testnet-helpers/Faucet.sol",
      "@pollum-io/lending-periphery/contracts/mocks/testnet-helpers/TestnetERC20.sol",
      "@pollum-io/lending-periphery/contracts/treasury/Collector.sol",
      "@pollum-io/lending-periphery/contracts/treasury/CollectorController.sol",
      "@pollum-io/lending-periphery/contracts/treasury/AaveEcosystemReserveV2.sol",
      "@pollum-io/lending-periphery/contracts/treasury/AaveEcosystemReserveController.sol",
      "@pollum-io/lending-periphery/contracts/adapters/paraswap/ParaSwapLiquiditySwapAdapter.sol",
      "@pollum-io/lending-periphery/contracts/adapters/paraswap/ParaSwapRepayAdapter.sol",
      "@pollum-io/lending-periphery/contracts/adapters/paraswap/ParaSwapWithdrawSwapAdapter.sol",
      "@pollum-io/pegasys-stake/contracts/StakedPSYSV3.sol",
      "@pollum-io/pegasys-stake/contracts/StakedTokenV3.sol",
    ],
  },
  // deterministicDeployment: DETERMINISTIC_DEPLOYMENT
  //   ? DETERMINISTIC_FACTORIES
  //   : undefined,
  etherscan: {
    apiKey: {
      rollux: "abc"
    },
    customChains: [
      {
        network: eEthereumNetwork.rollux,
        chainId: 570,
        urls: {
          apiURL: "https://explorer.rollux.com/api",
          browserURL: "https://explorer.rollux.com/",
        },
      },
    ],
  },
};
