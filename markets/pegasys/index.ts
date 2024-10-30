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
  // strategyPSYS
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
    // PSYS: strategyPSYS,
  },
  ReserveAssets: {
    [eEthereumNetwork.rollux]: {
      USDC: "0x368433CaC2A0B8D76E64681a9835502a1f2A8A30",
      BTC: "0x2A4DC2e946b92AB4a1f7D62844EB237788F9056c",
      ETH: "0xaA1c53AFd099E415208F47FCFA2C880f659E6904",
      USDT: "0x28c9c7Fb3fE3104d2116Af26cC8eF7905547349c",
      WSYS: "0x4200000000000000000000000000000000000006",
      // PSYS: "0x4200000000000000000000000000000000000006" // TODO: Set new PSYSv2 Address
    },
  },
  StkAaveProxy: {
    // [eEthereumNetwork.rollux]: '',
  },
};

export default AaveMarket;
