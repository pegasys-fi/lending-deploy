// scripts/verify_all.ts

import { run, ethers } from "hardhat";
import { DeploymentsExtension } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

async function main() {
  const hre: HardhatRuntimeEnvironment = require("hardhat");
  const deployments: DeploymentsExtension = hre.deployments;

  const allDeployments = await deployments.all();

  for (const contractName in allDeployments) {
    const deployment = allDeployments[contractName];
    if (deployment.metadata) {
      try {
        await run("verify:verify", {
          address: deployment.address,
          constructorArguments: deployment.args || [],
        });
        console.log(`Verified ${contractName} at ${deployment.address}`);
      } catch (error: any) {
        if (error.message.includes("Already Verified")) {
          console.log(`${contractName} is already verified.`);
        } else {
          console.error(`Failed to verify ${contractName}: ${error.message}`);
        }
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error: any) => {
    console.error(error);
    process.exit(1);
  });
