import {
  ConfigNames,
  isTestnetMarket,
  loadPoolConfig,
} from "./../../helpers/market-config-helpers";
import { Signer } from "ethers";
import { evmRevert, evmSnapshot } from "../../helpers/utilities/tx";
import { tEthereumAddress } from "../../helpers/types";
import { Pool } from "../../typechain";
import { AaveProtocolDataProvider } from "../../typechain";
import { AToken } from "../../typechain";
import { PoolConfigurator } from "../../typechain";

import chai from "chai";
import { PoolAddressesProvider } from "../../typechain";
import { PoolAddressesProviderRegistry } from "../../typechain";
import {
  AaveOracle,
  IERC20,
  StableDebtToken,
  VariableDebtToken,
  WETH9,
  WrappedTokenGatewayV3,
  Faucet,
} from "../../typechain";
import {
  ORACLE_ID,
  POOL_ADDRESSES_PROVIDER_ID,
  POOL_CONFIGURATOR_PROXY_ID,
  POOL_DATA_PROVIDER,
  POOL_PROXY_ID,
} from "../../helpers/deploy-ids";
import {
  getAToken,
  getERC20,
  getFaucet,
  getStableDebtToken,
  getVariableDebtToken,
  getWETH,
} from "../../helpers/contract-getters";

import { ethers, deployments } from "hardhat";
import { getEthersSigners } from "../../helpers/utilities/signer";
import { MARKET_NAME } from "../../helpers/env";

export interface SignerWithAddress {
  signer: Signer;
  address: tEthereumAddress;
}
export interface TestEnv {
  deployer: SignerWithAddress;
  poolAdmin: SignerWithAddress;
  emergencyAdmin: SignerWithAddress;
  riskAdmin: SignerWithAddress;
  users: SignerWithAddress[];
  pool: Pool;
  configurator: PoolConfigurator;
  oracle: AaveOracle;
  helpersContract: AaveProtocolDataProvider;
  wsys: WETH9;
  aWSYS: AToken;
  usdt: IERC20;
  aUsdt: AToken;
  variableDebtDai: VariableDebtToken;
  stableDebtDai: StableDebtToken;
  aUsdc: AToken;
  usdc: IERC20;
  // aave: IERC20;
  addressesProvider: PoolAddressesProvider;
  registry: PoolAddressesProviderRegistry;
  wrappedTokenGateway: WrappedTokenGatewayV3;
  faucetOwnable: Faucet;
}

let HardhatSnapshotId: string = "0x1";
const setHardhatSnapshotId = (id: string) => {
  HardhatSnapshotId = id;
};

const testEnv: TestEnv = {
  deployer: {} as SignerWithAddress,
  poolAdmin: {} as SignerWithAddress,
  emergencyAdmin: {} as SignerWithAddress,
  riskAdmin: {} as SignerWithAddress,
  users: [] as SignerWithAddress[],
  pool: {} as Pool,
  configurator: {} as PoolConfigurator,
  helpersContract: {} as AaveProtocolDataProvider,
  oracle: {} as AaveOracle,
  wsys: {} as WETH9,
  aWSYS: {} as AToken,
  usdt: {} as IERC20,
  aUsdt: {} as AToken,
  variableDebtDai: {} as VariableDebtToken,
  stableDebtDai: {} as StableDebtToken,
  aUsdc: {} as AToken,
  usdc: {} as IERC20,
  // aave: {} as IERC20,
  addressesProvider: {} as PoolAddressesProvider,
  registry: {} as PoolAddressesProviderRegistry,
  wrappedTokenGateway: {} as WrappedTokenGatewayV3,
  faucetOwnable: {} as Faucet,
} as TestEnv;

export async function initializeMakeSuite() {
  try {
    const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);

    const [_deployer, ...restSigners] = await getEthersSigners();
    const deployer: SignerWithAddress = {
      address: await _deployer.getAddress(),
      signer: _deployer,
    };

    for (const signer of restSigners) {
      testEnv.users.push({
        signer,
        address: await signer.getAddress(),
      });
    }

    // Get artifacts
    const wrappedTokenGatewayArtifact = await deployments.get("WrappedTokenGatewayV3");
    const poolArtifact = await deployments.get(POOL_PROXY_ID);
    const configuratorArtifact = await deployments.get(POOL_CONFIGURATOR_PROXY_ID);
    const addressesProviderArtifact = await deployments.get(POOL_ADDRESSES_PROVIDER_ID);
    const addressesProviderRegistryArtifact = await deployments.get("PoolAddressesProviderRegistry");
    const priceOracleArtifact = await deployments.get(ORACLE_ID);
    const dataProviderArtifact = await deployments.get(POOL_DATA_PROVIDER);

    // Initialize main contracts
    testEnv.deployer = deployer;
    testEnv.poolAdmin = deployer;
    testEnv.emergencyAdmin = testEnv.users[1];
    testEnv.riskAdmin = testEnv.users[2];
    testEnv.wrappedTokenGateway = await ethers.getContractAt(
      "WrappedTokenGatewayV3",
      wrappedTokenGatewayArtifact.address
    ) as WrappedTokenGatewayV3;
    testEnv.pool = await ethers.getContractAt(
      "Pool",
      poolArtifact.address
    ) as Pool;
    testEnv.configurator = await ethers.getContractAt(
      "PoolConfigurator",
      configuratorArtifact.address
    ) as PoolConfigurator;
    testEnv.addressesProvider = await ethers.getContractAt(
      "PoolAddressesProvider",
      addressesProviderArtifact.address
    ) as PoolAddressesProvider;
    testEnv.registry = await ethers.getContractAt(
      "PoolAddressesProviderRegistry",
      addressesProviderRegistryArtifact.address
    ) as PoolAddressesProviderRegistry;
    testEnv.oracle = await ethers.getContractAt(
      "AaveOracle",
      priceOracleArtifact.address
    ) as AaveOracle;
    testEnv.helpersContract = await ethers.getContractAt(
      "AaveProtocolDataProvider",
      dataProviderArtifact.address
    ) as AaveProtocolDataProvider;

    // Get all tokens and their aToken versions
    const allTokens = await testEnv.helpersContract.getAllATokens();
    const reservesTokens = await testEnv.helpersContract.getAllReservesTokens();

    // Find addresses for your specific tokens
    const aUsdcAddress = allTokens.find((aToken) => aToken.symbol === "aRlxUSDC")?.tokenAddress;
    const aUsdtAddress = allTokens.find((aToken) => aToken.symbol === "aRlxUSDT")?.tokenAddress;
    const aWsysAddress = allTokens.find((aToken) => aToken.symbol === "aRlxWSYS")?.tokenAddress;

    const usdcAddress = reservesTokens.find((token) => token.symbol === "USDC")?.tokenAddress;
    const usdtAddress = reservesTokens.find((token) => token.symbol === "USDT")?.tokenAddress;
    const wsysAddress = reservesTokens.find((token) => token.symbol === "WSYS")?.tokenAddress;

    // Get debt token addresses for DAI (since they're still in your interface)
    const {
      variableDebtTokenAddress: variableDebtDaiAddress,
      stableDebtTokenAddress: stableDebtDaiAddress,
    } = await testEnv.helpersContract.getReserveTokensAddresses(usdtAddress || "");  // Using USDT instead of DAI

    // Validate that we found all required tokens
    if (!aUsdcAddress || !aUsdtAddress || !aWsysAddress) {
      console.error('Missing required aToken addresses');
      process.exit(1);
    }
    if (!usdcAddress || !usdtAddress || !wsysAddress) {
      console.error('Missing required token addresses');
      process.exit(1);
    }

    // Initialize token contracts
    testEnv.aUsdc = await getAToken(aUsdcAddress);
    testEnv.aUsdt = await getAToken(aUsdtAddress);
    testEnv.aWSYS = await getAToken(aWsysAddress);

    testEnv.usdc = await getERC20(usdcAddress);
    testEnv.usdt = await getERC20(usdtAddress);
    testEnv.wsys = await getWETH(wsysAddress);

    // Initialize debt tokens (using USDT's debt tokens instead of DAI)
    testEnv.variableDebtDai = await getVariableDebtToken(variableDebtDaiAddress);
    testEnv.stableDebtDai = await getStableDebtToken(stableDebtDaiAddress);

    if (isTestnetMarket(poolConfig)) {
      testEnv.faucetOwnable = await getFaucet();
    }
  } catch (error) {
    console.error('Error in initializeMakeSuite:', error);
    throw error;
  }
}

const setSnapshot = async () => {
  setHardhatSnapshotId(await evmSnapshot());
};

const revertHead = async () => {
  await evmRevert(HardhatSnapshotId);
};

export function makeSuite(name: string, tests: (testEnv: TestEnv) => void) {
  describe(name, () => {
    before(async () => {
      await setSnapshot();
    });
    tests(testEnv);
    after(async () => {
      await revertHead();
    });
  });
}
