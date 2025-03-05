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
      USDC: '0x09Cf6537FD8de30Fb309B464499ad93bF7ecba55',
      BTC: '0x50A082713419A934bBeE0Bae2b7bD5e50980E017',
      ETH: '0x8Bd59448D3cB58A2c4Af2DeC01078e6b39438e89',
      USDT: '0x707d4ce20E4884320d31C78da748C977d01a3c2f',
      WSYS: "0x53F7e72C7ac55b44c7cd73cC13D4EF4b121678e6",
    },
  },
};

export default AaveMarket;
