// pages/api/create-trial-account.ts
import { NextResponse } from 'next/server';

import { NextApiRequest, NextApiResponse } from 'next';
const { Near } = require("@near-js/wallet-account");

import { connect, Account, keyStores, KeyPair } from 'near-api-js';
import { initKeypom, createTrialAccountDrop, CreateOrAddReturn } from '@keypom/core';
import fs from 'fs';
import path from 'path';
import { UnencryptedFileSystemKeyStore } from 'near-api-js/lib/key_stores';
import { homedir } from 'os';
const funderAccountId = 'dehonicore.testnet';
const NETWORK_ID = 'testnet';

interface INearConfig {
    networkId: string;
    keyStore: keyStores.KeyStore;
    nodeUrl: string;
    walletUrl: string;
    helperUrl: string;
    explorerUrl: string;
}

interface ITrialAccountParams {
    account: Account;
    numKeys: number;
    startingBalanceNEAR: string;
    callableContracts: string[];
    callableMethods: string[][];
    maxAttachableNEARPerContract: string[];
    trialEndFloorNEAR: string;
    contractBytes: number[];
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb' // Adjust size limit as necessary
        },
    },
};

// const credentialsPath = '/Users/dehoni/coreAccess/frontend/credentials';
// console.log('Credentials Path:', credentialsPath);

// if (fs.existsSync(credentialsPath)) {
//     console.log('The directory exists.');
// } else {
//     console.log('The directory does not exist.');
// }



// Change the function name to POST to meet the requirement
// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'POST') {
//         res.setHeader('Allow', ['POST']);
//         return res.status(405).end(`Method ${req.method} Not Allowed`);
//     }

//     const credentialsPath = process.env.CREDENTIALS_PATH || '/Users/dehoni/coreAccess/frontend/credentials'; // provide a fallback path
//     if (!credentialsPath) {
//         console.error("Credentials path is not set.");
//         res.status(500).json({ error: "Server configuration error: Missing credentials path" });
//         return;
//     }    

//     try {
//         const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
//         const nearConfig: INearConfig = {
//             networkId: 'testnet',
//             keyStore,
//             nodeUrl: 'https://rpc.testnet.near.org',
//             walletUrl: 'https://wallet.testnet.near.org',
//             helperUrl: 'https://helper.testnet.near.org',
//             explorerUrl: 'https://explorer.testnet.near.org',
//         };
//         console.log("Connecting to NEAR...");

//         const funderAccountId = 'dehonicore.testnet';
//         const near = await connect(nearConfig);
//         console.log("Connected, retrieving account...");

//         const fundingAccount = new Account(near.connection, process.env.FUNDER_ACCOUNT_ID!);
//         // const fundingAccount = new Account(near.connection, funderAccountId!);
//         console.log("Account loaded:", fundingAccount.accountId);

//         console.log("Initializing Keypom...");


//         await initKeypom({ near, network: 'testnet' });

//         const contractPath = path.join(process.cwd(), 'ext-wasm/trial-accounts.wasm');
//         console.log("Reading contract...");

//         const contractBytes = fs.readFileSync(contractPath);

//         const trialAccountParams: ITrialAccountParams = {
//             account: fundingAccount,
//             numKeys: 1,
//             startingBalanceNEAR: '0.5',
//             callableContracts: ['guest-book.examples.keypom.testnet'],
//             callableMethods: [['*']],
//             maxAttachableNEARPerContract: ['1'],
//             trialEndFloorNEAR: '0.01',
//             contractBytes: Array.from(new Uint8Array(contractBytes))
//         };
        

//         const { keys } = await createTrialAccountDrop(trialAccountParams);
//         if (!keys) {
//             throw new Error('Failed to create trial account: no keys returned');
//         }

//         res.status(200).json({ keys });
//     } catch (error) {
//         console.error('API Error:', error);
//         if (!res.status) {
//             console.error('Response object corrupted or undefined');
//             return; // Exit if res is not valid
//         }
//         res.status(500).json({ error: 'Internal Server Error', details: (error as Error).message });
//     }
// }
export async function POST(req: any) {
    try {
        // Define the path to the credentials file
        const credentialsPath = process.env.NEAR_CREDENTIALS_PATH;
        if (!credentialsPath) {
            return NextResponse.json({ error: 'NEAR_CREDENTIALS_PATH is not set' }, { status: 500 });
        }

        const keyFilePath = path.join(credentialsPath, 'dehonicore.testnet.json');
        console.log("Loading credentials from:", keyFilePath);

        if (!fs.existsSync(keyFilePath)) {
            return NextResponse.json({ error: `Credentials file not found at ${keyFilePath}` }, { status: 500 });
        }

        const keyFileContent = fs.readFileSync(keyFilePath, 'utf8');
        const keyDetails = JSON.parse(keyFileContent);

        // Create a KeyPair from the loaded private key
        const keyPair = KeyPair.fromString(keyDetails.private_key);

        // Setup a temporary in-memory key store and add the key pair
        const memoryKeyStore = new keyStores.InMemoryKeyStore();
        await memoryKeyStore.setKey('testnet', keyDetails.account_id, keyPair);

        // Configuration for NEAR connection
        const nearConfig = {
            networkId: 'testnet',
            keyStore: memoryKeyStore,
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
            explorerUrl: 'https://explorer.testnet.near.org',
        };

        const near = await connect(nearConfig);
        const account = new Account(near.connection, keyDetails.account_id);

        console.log("Account loaded:", account.accountId);

        // Initialize Keypom
        await initKeypom({ near, network: 'testnet' });

        const contractPath = path.join(process.cwd(), 'ext-wasm/trial-accounts.wasm');
        const contractBytes = fs.readFileSync(contractPath);

        const trialAccountParams = {
            account,
            numKeys: 1,
            startingBalanceNEAR: '0.5',
            callableContracts: ['guest-book.examples.keypom.testnet'],
            callableMethods: [['*']],
            maxAttachableNEARPerContract: ['1'],
            trialEndFloorNEAR: '0.01',
            contractBytes: Array.from(new Uint8Array(contractBytes))
        };
    

        // Create trial account drop and log the result
        const result = await createTrialAccountDrop(trialAccountParams);
        console.log('createTrialAccountDrop result:', result);

        if (result && result.keys) {
            return NextResponse.json({ message: "Trial account created successfully!", keys: result.keys }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Failed to create trial account', details: 'No keys returned' }, { status: 500 });
        }
    } catch (error) {
        console.error('Failed during NEAR operation:', error);
        return NextResponse.json({ error: 'Server error', details: (error as Error).message }, { status: 500 });
    }
}