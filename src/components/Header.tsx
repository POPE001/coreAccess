"use client"
import React from 'react';
import Link from 'next/link';
import { useWallet } from '../context/WalletContext';
import { useRouter } from 'next/navigation';
import WalletModal from './WalletModal';

const Header: React.FC = () => {
  const { walletConnected, username, disconnectWallet, connectWallet } = useWallet();
  const router = useRouter();

  const handleDisconnect = () => {
    disconnectWallet();
    router.push('/events');
  };

  return (
    <header className="bg-white py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link legacyBehavior href="/">
            <a><img src="/assets/logo.svg" alt="Logo" className="h-8 w-auto cursor-pointer" /></a>
          </Link>
        </div>
        <nav className="md:flex space-x-8 items-center">
          <Link legacyBehavior href="/events"><a>Events</a></Link>
          <WalletModal
            walletConnected={walletConnected}
            username={username}
            onWalletConnect={(username) => {
              connectWallet(); // Remove the username argument
              router.push('/events');
            }}
            onDisconnect={handleDisconnect}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
