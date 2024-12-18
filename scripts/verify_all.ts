import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import { DeploymentsExtension } from "hardhat-deploy/types";

declare module "hardhat/types" {
    interface HardhatRuntimeEnvironment {
        deployments: DeploymentsExtension;
    }
}

interface CompilationTarget {
    [key: string]: string;
}

interface MetadataSettings {
    compilationTarget: CompilationTarget;
}

interface ContractMetadata {
    settings?: MetadataSettings;
}

async function getContractPath(metadata: ContractMetadata | string): Promise<string | undefined> {
    if (typeof metadata === 'string') {
        return undefined;
    }

    if (!metadata.settings?.compilationTarget) {
        return undefined;
    }

    const targets = Object.keys(metadata.settings.compilationTarget);
    return targets.length > 0 ? metadata.settings.compilationTarget[targets[0]] : undefined;
}

async function verifyContract(
    hre: HardhatRuntimeEnvironment,
    address: string,
    constructorArguments: any[],
    contract?: string | undefined
) {
    try {
        const verifyArgs: any = {
            address,
            constructorArguments
        };

        if (contract) {
            verifyArgs.contract = contract;
        }

        await hre.run("verify:verify", verifyArgs);
        return true;
    } catch (error: any) {
        if (error.message.includes("Already Verified")) {
            console.log(`Contract at ${address} is already verified.`);
            return true;
        } else if (error.message.includes("constructor arguments")) {
            // Try verifying without constructor arguments
            try {
                await hre.run("verify:verify", {
                    address,
                    constructorArguments: []
                });
                return true;
            } catch (retryError: any) {
                console.error(`Failed to verify with empty constructor args: ${retryError.message}`);
                return false;
            }
        }
        console.error(`Verification failed: ${error.message}`);
        return false;
    }
}

async function main() {
    const hre: HardhatRuntimeEnvironment = require("hardhat");
    const deployments: DeploymentsExtension = hre.deployments;
    const allDeployments = await deployments.all();

    for (const contractName in allDeployments) {
        const deployment = allDeployments[contractName];
        if (!deployment.metadata) continue;

        console.log(`\nProcessing ${contractName}...`);

        // Get the contract path from metadata
        const contractPath = await getContractPath(deployment.metadata);

        // Check if this is an implementation contract
        if (deployment.implementation) {
            console.log(`Verifying implementation for ${contractName}`);
            const success = await verifyContract(
                hre,
                deployment.implementation,
                deployment.args || [],
                contractPath
            );

            if (success) {
                console.log(`Successfully verified implementation for ${contractName}`);
            }
        }

        // Verify the proxy or main contract
        const success = await verifyContract(
            hre,
            deployment.address,
            deployment.args || [],
            contractPath
        );

        if (success) {
            console.log(`Verified ${contractName} at ${deployment.address}`);
        } else {
            console.log(`Failed to verify ${contractName} at ${deployment.address}`);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error: any) => {
        console.error(error);
        process.exit(1);
    });