import fs from 'fs';
import path from 'path';

const PACKAGES = [
    '@pollum-io/lending-core',
    '@pollum-io/lending-periphery',
    '@pollum-io/pegasys-stake'
];

function logDebug(message: string): void {
    console.log(`[DEBUG] ${message}`);
}

function logError(message: string, error?: Error): void {
    console.error(`[ERROR] ${message}`);
    if (error) {
        console.error(`[ERROR] Details: ${error.message}`);
        console.error(`[ERROR] Stack: ${error.stack}`);
    }
}

function checkDirectoryExists(dirPath: string, context: string): void {
    if (!fs.existsSync(dirPath)) {
        throw new Error(`${context} directory does not exist: ${dirPath}`);
    }
    logDebug(`Confirmed ${context} directory exists: ${dirPath}`);
}

function copyDirectory(source: string, target: string): void {
    try {
        checkDirectoryExists(source, 'Source');
        logDebug(`Starting to copy from ${source} to ${target}`);

        // Create target directory if it doesn't exist
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target, { recursive: true });
            logDebug(`Created target directory: ${target}`);
        }

        // Read source directory
        const files = fs.readdirSync(source);
        logDebug(`Found ${files.length} files/directories in source`);

        for (const file of files) {
            const sourcePath = path.join(source, file);
            const targetPath = path.join(target, file);

            const stat = fs.statSync(sourcePath);

            if (stat.isDirectory()) {
                logDebug(`Found directory: ${file}`);
                copyDirectory(sourcePath, targetPath);
            } else if (file.endsWith('.sol')) {
                try {
                    fs.copyFileSync(sourcePath, targetPath);
                    logDebug(`Successfully copied: ${file}`);
                } catch (err) {
                    logError(`Failed to copy ${file}`, err instanceof Error ? err : undefined);
                }
            } else {
                logDebug(`Skipping non-Solidity file: ${file}`);
            }
        }
    } catch (err) {
        logError(`Error in copyDirectory`, err instanceof Error ? err : undefined);
        throw err;
    }
}

function verifyPackages(): void {
    logDebug('Starting package verification');
    for (const pkg of PACKAGES) {
        const pkgPath = path.join(process.cwd(), 'node_modules', pkg);
        if (!fs.existsSync(pkgPath)) {
            throw new Error(`Package ${pkg} not found. Please run 'npm install' first.`);
        }
        logDebug(`Verified package exists: ${pkg}`);
    }
}

async function main(): Promise<void> {
    try {
        logDebug('Starting contract copy process');

        // Verify packages are installed
        verifyPackages();

        // Get the correct path for the external directory
        const projectRoot = process.cwd();
        const externalDir = path.join(projectRoot, 'contracts');
        logDebug(`External directory path: ${externalDir}`);

        // Clean external directory if it exists
        if (fs.existsSync(externalDir)) {
            fs.rmSync(externalDir, { recursive: true });
            logDebug('Cleaned existing external directory');
        }
        fs.mkdirSync(externalDir, { recursive: true });
        logDebug('Created fresh external directory');

        // Copy all contracts from each package
        for (const pkg of PACKAGES) {
            const sourceContractsDir = path.join(projectRoot, 'node_modules', pkg, 'contracts');
            const targetDir = path.join(externalDir, pkg.replace('@pollum-io/', ''));

            try {
                checkDirectoryExists(sourceContractsDir, 'Source contracts');
                logDebug(`Starting to copy contracts from ${pkg}`);
                copyDirectory(sourceContractsDir, targetDir);
                logDebug(`Finished copying contracts from ${pkg}`);
            } catch (err) {
                logError(`Failed to process package ${pkg}`, err instanceof Error ? err : undefined);
                // Continue with next package instead of failing completely
                continue;
            }
        }

        logDebug('Successfully finished copying all contracts');
    } catch (err) {
        logError('Main process error', err instanceof Error ? err : undefined);
        process.exit(1);
    }
}

// Add process error handlers
process.on('uncaughtException', (err) => {
    logError('Uncaught exception', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logError('Unhandled rejection', err instanceof Error ? err : undefined);
    process.exit(1);
});

main().catch((err) => {
    logError('Unhandled error in main', err instanceof Error ? err : undefined);
    process.exit(1);
});