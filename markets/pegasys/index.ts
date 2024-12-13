import {
  IAaveConfiguration,
  eEthereumNetwork,
} from "../../helpers/types";

import { CommonsConfig } from "./commons";
import {
  strategyUSDC,
  strategyBTC,
  strategyETH,
  strategyUSDT,
  strategyWSYS,
} from "./reservesConfigs";

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const AaveMarket: IAaveConfiguration = {
  ...CommonsConfig,
  MarketId: "Rollux Pegasys Market",
  ATokenNamePrefix: "Rollux",
  StableDebtTokenNamePrefix: "Rollux",
  VariableDebtTokenNamePrefix: "Rollux",
  SymbolPrefix: "Rlx",
  ProviderId: 30,
  ReservesConfig: {
    USDC: strategyUSDC,
    BTC: strategyBTC,
    ETH: strategyETH,
    USDT: strategyUSDT,
    WSYS: strategyWSYS,
  },
  ReserveAssets: {
    [eEthereumNetwork.zkSyncTestnet]: {
      USDC: "0x7198F6D6734E27a1E6Dce7ED77867219dECb0acf",
      BTC: "0x0b8F3C45A0F3440881F596B442Fa0d23443bfBb4",
      ETH: "0x16970AAd30DBf9706fa68143B6651396c9aaf9d6",
      USDT: "0x86972CecBdC58198fC9785f46eE9Aa49252cE579",
      WSYS: "0x53F7e72C7ac55b44c7cd73cC13D4EF4b121678e6",
    },
  },
};

export default AaveMarket;
