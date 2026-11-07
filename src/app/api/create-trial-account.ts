// // Assuming this file is located at /src/app/api/create-trial-account.ts

// import { NextResponse } from 'next/server';
// import { connect, Account, keyStores } from 'near-api-js';
// import { initKeypom, createTrialAccountDrop } from '@keypom/core';
// import { INearConfig, ITrialAccountParams } from '../../../types/index';
// import fs from 'fs';
// import path from 'path';

// export async function post(req) {
//     try {
//         const keyStore = new keyStores.UnencryptedFileSystemKeyStore('.near-credentials');
//         const nearConfig: INearConfig = {
//             networkId: 'testnet',
//             keyStore,
//             nodeUrl: 'https://rpc.testnet.near.org',
//             walletUrl: 'https://wallet.testnet.near.org',
//             helperUrl: 'https://helper.testnet.near.org',
//             explorerUrl: 'https://explorer.testnet.near.org',
//         };

//         const near = await connect(nearConfig);
//         const fundingAccount = new Account(near.connection, process.env.FUNDER_ACCOUNT_ID);

//         await initKeypom({ near, network: 'testnet' });

//         const contractPath = path.join(process.cwd(), 'ext-wasm/trial-accounts.wasm');
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

//         const { keys } = await createTrialAccountDrop(trial;)
//         return NextResponse.json({ keys });
//     } catch (error) {
//         console.error('Failed to create trial account:', error);
//         return NextResponse.json({ error: 'Server error', details: error.message }, 500);
//     }
// }
