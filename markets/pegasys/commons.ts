import {
  AssetType,
  TransferStrategy,
  ICommonConfiguration,
  eEthereumNetwork,
} from "../../helpers/types";
import { ZERO_ADDRESS } from "../../helpers/constants";
import {
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileOne,
} from "./rateStrategies";
// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

export const CommonsConfig: ICommonConfiguration = {
  MarketId: "Commons Pegasys Market",
  ATokenNamePrefix: "Rollux",
  StableDebtTokenNamePrefix: "Rollux",
  VariableDebtTokenNamePrefix: "Rollux",
  SymbolPrefix: "Rlx",
  ProviderId: 8080,
  OracleQuoteCurrencyAddress: ZERO_ADDRESS,
  OracleQuoteCurrency: "USD",
  OracleQuoteUnit: "8",
  WrappedNativeTokenSymbol: "WSYS",
  ChainlinkAggregator: {
    [eEthereumNetwork.rollux]: {
      USDC: '0x4202D0EfeA0AEC3d9582d499e340dF73cF428eB2',
      WBTC: '0x6386dDfaF09f0e0517D9861BA5680CB6a0c18Dc3',
      WETH: '0x5668E903ae1bED9b719CDf259C905103d60EAEaA',
      USDT: '0x09C3FEBc4b3e6bF01472aF47bc87a2c3301789c5',
      WSYS: '0x93fFce52f5776ad8465669b5C52548b92ed6678F',
      // PSYS: '0x93fFce52f5776ad8465669b5C52548b92ed6678F', // TODO: we dont have it :/
    },
  },
  ReserveFactorTreasuryAddress: {
    // [eEthereumNetwork.rollux]: ZERO_ADDRESS,
  },
  FallbackOracle: {
    [eEthereumNetwork.rollux]: ZERO_ADDRESS,
  },
  ReservesConfig: {},
  IncentivesConfig: {
    enabled: {
      // [eEthereumNetwork.rollux]: true,
    },
    rewards: {

      // [eEthereumNetwork.rollux]: {
      //   StkAave: ZERO_ADDRESS,
      // }
    },
    rewardsOracle: {
      // [eEthereumNetwork.rollux]: {
      //   StkAave: ZERO_ADDRESS,
      // },

    },
    incentivesInput: {
      // [eArbitrumNetwork.arbitrumTestnet]: [
      //   {
      //     emissionPerSecond: "34629756533",
      //     duration: 7890000,
      //     asset: "DAI",
      //     assetType: AssetType.AToken,
      //     reward: "CRV",
      //     rewardOracle: "0",
      //     transferStrategy: TransferStrategy.PullRewardsStrategy,
      //     transferStrategyParams: "0",
      //   },
      //   {
      //     emissionPerSecond: "300801036720127500",
      //     duration: 7890000,
      //     asset: "USDC",
      //     assetType: AssetType.AToken,
      //     reward: "REW",
      //     rewardOracle: "0",
      //     transferStrategy: TransferStrategy.PullRewardsStrategy,
      //     transferStrategyParams: "0",
      //   },
      //   {
      //     emissionPerSecond: "300801036720127500",
      //     duration: 7890000,
      //     asset: "LINK",
      //     assetType: AssetType.AToken,
      //     reward: "REW",
      //     rewardOracle: "0",
      //     transferStrategy: TransferStrategy.PullRewardsStrategy,
      //     transferStrategyParams: "0",
      //   },
      // ],
    },
  },
  EModes: {
    StableEMode: {
      id: "1",
      ltv: "9700",
      liquidationThreshold: "9750",
      liquidationBonus: "10100",
      label: "Stablecoins",
      assets: ["USDC", "USDT"],
    },
  },
  L2PoolEnabled: {
    [eEthereumNetwork.rollux]: true,
  },
  ParaswapRegistry: {
    // [eEthereumNetwork.rollux]: ZERO_ADDRESS
  },
  FlashLoanPremiums: {
    total: 0.0005e4,
    protocol: 0.0004e4,
  },
  RateStrategies: {
    rateStrategyVolatileOne,
    rateStrategyStableOne,
    rateStrategyStableTwo,
  },
};
