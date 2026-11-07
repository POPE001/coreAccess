"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
    WalletSelector,
    setupWalletSelector,
} from '@near-wallet-selector/core';
import { setupSender } from '@near-wallet-selector/sender';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupModal } from '@near-wallet-selector/modal-ui';
import '@near-wallet-selector/modal-ui/styles.css';

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
    const [modal, setModal] = useState<any>(null);

    useEffect(() => {
        const initWalletSelector = async () => {
            try {
                const selector = await setupWalletSelector({
                    network: 'testnet',
                    modules: [
                        setupSender(),
                        setupMyNearWallet(),
                        setupLedger(),
                        setupMeteorWallet(),
                    ],
                });
                const modal = setupModal(selector, {
                    contractId: 'dehonicore.testnet',
                });

                setSelector(selector);
                setModal(modal);
            } catch (error) {
                console.error('Error initializing wallet selector:', error);
            }
        };

        initWalletSelector();
    }, []);

    useEffect(() => {
        if (modal) {
            modal.on('connect', async (data: { accounts: { accountId: string }[] }) => {
                const accountId = data.accounts[0].accountId;
                console.log('Account ID:', accountId); // Debugging line
                setUsername(accountId);
                setWalletConnected(true);

                // Save the account to the backend
                await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ address: accountId }),
                });

                console.log('Navigating to /events'); // Debugging line
                router.push('/events');
            });
        }
    }, [modal, router]);

    const connectWallet = () => {
        if (modal) {
            try {
                console.log('Showing modal'); // Debugging line
                modal.show();
            } catch (error) {
                console.error('Error showing modal:', error);
                alert('Unable to show wallet modal. Please ensure the required wallet extension is installed.');
            }
        } else {
            alert('Wallet modal is not initialized. Please ensure the required wallet extension is installed.');
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
