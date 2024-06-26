import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import path
import EventsView from '../components/EventsView';
import { gsap } from 'gsap';
import { setupWalletSelector, WalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupSender } from '@near-wallet-selector/sender';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import '@near-wallet-selector/modal-ui/styles.css';

const Home = () => {
    const [isConnected, setIsConnected] = useState(false);
    const router = useRouter();
    const [walletConnected, setWalletConnected] = useState(false);
    const [username, setUsername] = useState('');
    const [selector, setSelector] = useState<WalletSelector | null>(null);
    const [modal, setModal] = useState<any>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        async function initWalletSelector() {
            const selector = await setupWalletSelector({
                network: 'testnet',
                modules: [
                    setupSender(),
                    setupMyNearWallet(),
                    setupLedger(),
                    setupMeteorWallet()
                ],
            });

            const modal = setupModal(selector, {
                contractId: 'dehoni.testnet',
            });

            setSelector(selector);
            setModal(modal);
        }

        initWalletSelector();
    }, []);

    const connectWallet = async () => {
        if (modal) {
            modal.show();
            modal.on('connect', (data: { username: string }) => {
                setUsername(data.username);
                setWalletConnected(true);
                router.push('/events');
            });
        }
    };

    return (
        <div className="bg-white text-black text-center p-4 sm:p-10 flex flex-col items-center justify-center min-h-screen">
            {!isConnected ? (
                <div ref={heroRef}>
                    <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                        <span>REVOLUTIONIZING </span><br className="hidden md:inline" />
                        <span style={{
                            background: 'linear-gradient(90deg, rgba(237,31,142,1) 0%, rgba(109,40,217,1) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline'
                        }}>EVENT TICKETING</span><br />
                        WITH WEB3
                    </h2>
                    <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-md sm:max-w-lg mx-auto">
                        Discover a seamless and engaging ticketing experience for both event organizers and attendees.
                    </p>
                    {walletConnected ? (
                        <span className="text-black">Welcome, {username}</span>
                    ) : (
                        <button ref={buttonRef} onClick={connectWallet} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Connect Wallet</button>
                    )}
                </div>
            ) : (
                <EventsView />
            )}
        </div>
    );
};

export default Home;
