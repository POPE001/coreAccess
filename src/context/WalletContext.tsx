"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
    WalletSelector,
    setupWalletSelector,
} from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupSender } from '@near-wallet-selector/sender';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';

interface WalletContextType {
    walletConnected: boolean;
    username: string;
    connectWallet: () => void;
    disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === null) throw new Error('useWallet must be used within a WalletProvider');
    return context;
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [username, setUsername] = useState('');
    const router = useRouter();
    const [selector, setSelector] = useState<WalletSelector | null>(null);

    useEffect(() => {
        const initWalletSelector = async () => {
            const selector = await setupWalletSelector({
                network: 'testnet',
                modules: [
                    setupSender(),
                    setupMyNearWallet(),
                    setupLedger(),
                    setupMeteorWallet(),
                ],
            });
            setSelector(selector);
            return () => {
                // Proper cleanup if needed when component unmounts
            };
        };

        initWalletSelector();
    }, []);

    const connectWallet = async () => {
      const wallet = await selector?.wallet("my-near-wallet");
      const signInParams = {
          contractId: "dehonicore.testnet",
          // Add more fields if necessary to cover other wallet types:
          methodNames: [], // Array of method names if needed for the contract
          // Optional: provide an empty accounts array if no specific accounts are needed
          accounts: []
      };
      const accounts = await wallet?.signIn(signInParams);
      if (accounts && accounts.length > 0) {
          setUsername(accounts[0].accountId);
          setWalletConnected(true);
          router.push('/events');
      }
  };
  
    const disconnectWallet = async () => {
        const wallet = await selector?.wallet("my-near-wallet");
        await wallet?.signOut();
        setUsername('');
        setWalletConnected(false);
        router.push('/');
    };

    return (
        <WalletContext.Provider value={{ walletConnected, username, connectWallet, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};
