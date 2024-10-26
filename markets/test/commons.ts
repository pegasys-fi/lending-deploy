import { parseUnits } from "ethers/lib/utils";
import { ZERO_ADDRESS } from "../../helpers/constants";
import {
    ICommonConfiguration,
    eEthereumNetwork,
    TransferStrategy,
    AssetType,
} from "../../helpers/types";
import {
    rateStrategyStableOne,
    rateStrategyStableTwo,
    rateStrategyVolatileOne,
} from "./rateStrategies";
// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

export const CommonsConfig: ICommonConfiguration = {
    MarketId: "Testnet Pegasys Market",
    ATokenNamePrefix: "Testnet",
    StableDebtTokenNamePrefix: "Testnet",
    VariableDebtTokenNamePrefix: "Testnet",
    SymbolPrefix: "Test",
    ProviderId: 0,
    OracleQuoteCurrencyAddress: ZERO_ADDRESS,
    OracleQuoteCurrency: "USD",
    OracleQuoteUnit: "8",
    WrappedNativeTokenSymbol: "WETH",
    ChainlinkAggregator: {

    },
    ReserveFactorTreasuryAddress: {

    },
    FallbackOracle: {

    },
    ReservesConfig: {},
    IncentivesConfig: {
        enabled: {
            [eEthereumNetwork.hardhat]: true,
        },
        rewards: {
            [eEthereumNetwork.hardhat]: {
                CRV: ZERO_ADDRESS,
                REW: ZERO_ADDRESS,
                BAL: ZERO_ADDRESS,
                StkAave: ZERO_ADDRESS,
            },
        },
        rewardsOracle: {
            [eEthereumNetwork.hardhat]: {
                CRV: ZERO_ADDRESS,
                REW: ZERO_ADDRESS,
                BAL: ZERO_ADDRESS,
                StkAave: ZERO_ADDRESS,
            },
        },
        incentivesInput: {
            [eEthereumNetwork.hardhat]: [
                {
                    emissionPerSecond: "34629756533",
                    duration: 7890000,
                    asset: "DAI",
                    assetType: AssetType.AToken,
                    reward: "CRV",
                    rewardOracle: "0",
                    transferStrategy: TransferStrategy.PullRewardsStrategy,
                    transferStrategyParams: "0",
                },
                {
                    emissionPerSecond: "300801036720127500",
                    duration: 7890000,
                    asset: "USDC",
                    assetType: AssetType.AToken,
                    reward: "REW",
                    rewardOracle: "0",
                    transferStrategy: TransferStrategy.PullRewardsStrategy,
                    transferStrategyParams: "0",
                },
            ],
        },
    },
    EModes: {
        StableEMode: {
            id: "1",
            ltv: "9800",
            liquidationThreshold: "9850",
            liquidationBonus: "10100",
            label: "Stable-EMode",
            assets: ["USDC", "DAI"],
        },
    },
    FlashLoanPremiums: {
        total: 0.0009e4,
        protocol: 0,
    },
    RateStrategies: {
        rateStrategyVolatileOne,
        rateStrategyStableOne,
        rateStrategyStableTwo,
    },
};