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
      BTC: '0x38e95063B860118b47767D0a12b6C90Fc5a5Dde2',
      ETH: '0x808bCa6Af05Dc1401482546E3E840cBFed9784aE',
      USDT: '0x8723EDbF810226521806c71a15BBA54F55A07e37',
      WSYS: '0x419e42aA0d636076B2c3F8AFE9629E605DED38a2',
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
    [eEthereumNetwork.zkSyncTestnet]: true,
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
