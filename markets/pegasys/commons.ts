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
      USDC: '0xB5fb9ACc579cdCB2290b0D1793E2295A179459AE',
      BTC: '0x4baCFA5b967C9464B3F6e0cBfC498BC4791DE735',
      ETH: '0xcf07748881d1E845F47B25C4f08a0463eCd276A2',
      USDT: '0x14a96a477316DaeCB3cB20245a5c989101A0C552',
      WSYS: '0x37C0ca6562B45Dbfa54c46595C3bd654C2Ee35DE',
    },
  },
  ReserveFactorTreasuryAddress: {
  },
  FallbackOracle: {
    [eEthereumNetwork.rollux]: ZERO_ADDRESS,
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
    [eEthereumNetwork.rollux]: true,
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
