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
    WrappedNativeTokenSymbol: "WSYS",
    TestnetMarket: true,
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
            [eEthereumNetwork.zkSysTestnet]: true,
        },
        rewards: {
            [eEthereumNetwork.hardhat]: {
                CRV: ZERO_ADDRESS,
                REW: ZERO_ADDRESS,
                BAL: ZERO_ADDRESS,
                stkPSYS: ZERO_ADDRESS,
            },
            [eEthereumNetwork.zkSysTestnet]: {
                stkPSYS: ZERO_ADDRESS,
            },
        },
        rewardsOracle: {
            [eEthereumNetwork.zkSysTestnet]: {
                stkPSYS: ZERO_ADDRESS,
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
            [eEthereumNetwork.zkSysTestnet]: [
                {
                    emissionPerSecond: "34629756533",
                    duration: 7890000,
                    asset: "USDC",
                    assetType: AssetType.AToken,
                    reward: "stkPSYS",
                    rewardOracle: "0",
                    transferStrategy: TransferStrategy.PullRewardsStrategy,
                    transferStrategyParams: "0",
                },
                {
                    emissionPerSecond: "34629756533",
                    duration: 7890000,
                    asset: "BTC",
                    assetType: AssetType.AToken,
                    reward: "stkPSYS",
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
            assets: ["USDC", "USDT"],
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