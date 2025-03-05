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
    [eEthereumNetwork.zkSyncTestnet]: {
      USDC: '0x5014a609A8C8B7c265A8Cf60334E340b5e434976',
      BTC: '0x5014a609A8C8B7c265A8Cf60334E340b5e434976',
      ETH: '0x5014a609A8C8B7c265A8Cf60334E340b5e434976',
      USDT: '0x5014a609A8C8B7c265A8Cf60334E340b5e434976',
      WSYS: '0x5014a609A8C8B7c265A8Cf60334E340b5e434976',
    },
  },
  ReserveFactorTreasuryAddress: {
  },
  FallbackOracle: {
    [eEthereumNetwork.zkSyncTestnet]: ZERO_ADDRESS,
  },
  ReservesConfig: {},
  IncentivesConfig: {
    enabled: {
    },
    rewards: {
    },
    rewardsOracle: {

    },
    incentivesInput: {
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
    // [eEthereumNetwork.zkSyncTestnet]: true,
  },
  ParaswapRegistry: {
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
