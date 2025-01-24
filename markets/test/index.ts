import {
    rateStrategyStableOne,
    rateStrategyStableTwo,
    rateStrategyVolatileOne,
} from "./rateStrategies";
import { ZERO_ADDRESS } from "../../helpers";
import {
    IAaveConfiguration,
    eEthereumNetwork,
} from "../../helpers/types";

import { CommonsConfig } from "./commons";
import {
    strategyUSDC,
    strategyBTC,
    // strategyETH,
    strategyUSDT,
    strategyWSYS,
    strategyPSYS
} from "./reservesConfigs";

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const AaveMarket: IAaveConfiguration = {
    ...CommonsConfig,
    MarketId: "Testnet Aave Market",
    ProviderId: 8080,
    ReservesConfig: {
        PSYS: strategyPSYS,
        USDC: strategyUSDC,
        USDT: strategyUSDT,
        BTC: strategyBTC,
        WSYS: strategyWSYS,
    },
    ReserveAssets: {
        [eEthereumNetwork.rollux]: {
            PSYS: ZERO_ADDRESS,
            USDC: ZERO_ADDRESS,
            USDT: ZERO_ADDRESS,
            BTC: ZERO_ADDRESS,
            WSYS: ZERO_ADDRESS,
        },
    },
};

export default AaveMarket;