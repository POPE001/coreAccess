// import { initKeypom } from '@keypom/core';
// import { setupWalletSelector } from "@near-wallet-selector/core";
// import { setupModal } from '@near-wallet-selector/modal-ui-js';
// import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
// import { UnencryptedFileSystemKeyStore } from "@near-js/keystores-node";
// import { Near, ConnectConfig } from "@near-js/wallet-account";
// import { Account } from '@near-js/accounts';
// import { homedir } from 'os';
// import path from 'path';
// import { readFileSync } from 'fs';
// import dotenv from 'dotenv';

// dotenv.config();

// const NETWORK_ID = 'testnet';
// const funderAccountId = 'minqi.testnet';
// const CREDENTIALS_DIR = '.near-credentials';
// const credentialsPath = path.join(homedir(), CREDENTIALS_DIR);

// export async function initializeKeypomAndWallet() {
//     const keyStore = new UnencryptedFileSystemKeyStore(credentialsPath);

//     const nearConfig: ConnectConfig = {
//         networkId: NETWORK_ID,
//         keyStore: keyStore,
//         nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
//         walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
//         helperUrl: `https://helper.${NETWORK_ID}.near.org`,
//         explorerUrl: `https://explorer.${NETWORK_ID}.near.org`,
//     };

//     const near = new Near(nearConfig);
//     const fundingAccount = new Account(near.connection, funderAccountId);

//     // Initialize Keypom
//     await initKeypom({
//         near,
//         network: NETWORK_ID,
//     });

//     // Initialize wallet selector
//     const selector = await setupWalletSelector({
//         network: NETWORK_ID,
//         modules: [setupMyNearWallet()],
//     });

//     // Initialize modal UI
//     const modal = setupModal(selector, {
//         contractId: "test.testnet",
//         methodNames: ['*'],
//         theme: 'auto',
//     });

//     return { near, walletSelector: selector, fundingAccount, modal };
// }
