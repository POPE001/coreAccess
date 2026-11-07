import { NextRequest, NextResponse } from 'next/server';
import { initKeypom, createTrialAccountDrop } from '@keypom/core';
import { Near } from '@near-js/wallet-account';
import { Account } from '@near-js/accounts';
import {  KeyPair } from 'near-api-js';

import { UnencryptedFileSystemKeyStore,  } from 'near-api-js/lib/key_stores';
import { readFileSync } from 'fs';
import path from 'path';
import fs from 'fs';

const funderAccountId = 'dehonicore.testnet';
const NETWORK_ID = 'testnet';

export async function POST(req: NextRequest) {
  try {
    console.log("Fetching credentials path...");
    const credentialsPath = process.env.CREDENTIALS_PATH || '/Users/dehoni/coreAccess/frontend/credentials';
    const credentialsFilePath = path.join(credentialsPath, `${funderAccountId}.json`);
    console.log(`Using credentials file: ${credentialsFilePath}`);

    console.log("Initializing key store...");
    const keyStore = new UnencryptedFileSystemKeyStore(credentialsPath);

    // Ensure credentials file exists before attempting to read the key
    if (!fs.existsSync(credentialsFilePath)) {
      throw new Error(`Credentials file not found: ${credentialsFilePath}`);
    }

    // Manually load the key from the credentials file for debugging
    const credentials = JSON.parse(fs.readFileSync(credentialsFilePath, 'utf-8'));
    console.log("Credentials:", credentials);

    const keyPair = KeyPair.fromString(credentials.private_key);
    await keyStore.setKey(NETWORK_ID, funderAccountId, keyPair);

    const key = await keyStore.getKey(NETWORK_ID, funderAccountId);

    if (!key) {
      console.error("No key found for account:", funderAccountId);
      return NextResponse.json({ error: "No key found for account" }, { status: 404 });
    }

    console.log("Public Key Retrieved:", key.getPublicKey().toString());

    console.log("Configuring NEAR client...");
    const nearConfig = {
      networkId: NETWORK_ID,
      keyStore: keyStore,
      nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
      walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
      helperUrl: `https://helper.${NETWORK_ID}.near.org`,
      explorerUrl: `https://explorer.${NETWORK_ID}.near.org`,
    };

    console.log("Connecting to NEAR network...");
    const near = new Near(nearConfig);
    const fundingAccount = new Account(near.connection, funderAccountId);

    console.log("Initializing Keypom...");
    await initKeypom({ near, network: NETWORK_ID });

    console.log("Reading smart contract file...");
    const wasmDirectory = path.resolve(process.cwd(), 'ext-wasm', 'trial-accounts.wasm');
    const contractBytes = readFileSync(wasmDirectory);
    console.log("Smart contract file loaded.");

    console.log("Creating trial account...");
    const { keys } = await createTrialAccountDrop({
      account: fundingAccount,
      numKeys: 1,
      contractBytes: [...contractBytes],
      startingBalanceNEAR: 2.5,
      callableContracts: ['guest-book.examples.keypom.testnet', 'v1.social08.testnet'],
      callableMethods: [['*'], ['*']],
      maxAttachableNEARPerContract: ['1', '1'],
      trialEndFloorNEAR: 1.25
    });

    console.log("Trial account created successfully.");
    return NextResponse.json({ keys }, { status: 200 });
  } catch (error) {
    console.error('Failed to create trial account:', error);
    return NextResponse.json({ error: 'Failed to create trial account', details: (error as Error).message }, { status: 500 });
  }
}
