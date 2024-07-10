'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '../context/WalletContext';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
    const { walletConnected, username, disconnectWallet, connectWallet } = useWallet();
    const { items } = useCart();
    const router = useRouter();
    const pathname = usePathname() || '/';

    const [isClient, setIsClient] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleDisconnect = () => {
        disconnectWallet();
        router.push('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
        setTimeout(() => router.replace(pathname), 0);  // Force re-render by navigating to the current route
    };

    return (
        <header className="bg-white py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <Link legacyBehavior href="/" passHref>
                        <a>
                            <img src="/assets/logo.svg" alt="Logo" className="h-8 w-auto cursor-pointer" />
                        </a>
                    </Link>
                </div>

                <nav className="hidden md:flex flex-grow justify-center items-center space-x-4">
                    <Link legacyBehavior href="/events" passHref>
                        <a className="text-gray-700 hover:text-blue-500 transition duration-300">Events</a>
                    </Link>
                    <Link legacyBehavior href="/view-event" passHref>
                        <a className="text-gray-700 hover:text-blue-500 transition duration-300">View Events</a>
                    </Link>
                    <Link legacyBehavior href="/docs" passHref>
                        <a className="text-gray-700 hover:text-blue-500 transition duration-300">Docs</a>
                    </Link>
                    <Link legacyBehavior href="/pricing" passHref>
                        <a className="text-gray-700 hover:text-blue-500 transition duration-300">Pricing</a>
                    </Link>
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    {isClient && (
                        <Link legacyBehavior href="/cart" passHref>
                            <a className="relative">
                                <svg
                                    className="h-6 w-6 text-gray-700 hover:text-blue-500 transition duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13h.01M17 13l1.2 6.2a2 2 0 11-2.4 1.8h-8a2 2 0 11-2.4-1.8L7 13h10z"
                                    ></path>
                                </svg>
                                {items.length > 0 && (
                                    <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded-full bg-red-500 text-white text-xs leading-tight text-center">
                                        {items.length}
                                    </span>
                                )}
                            </a>
                        </Link>
                    )}
                    {walletConnected ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {username}</span>
                            <button
                                onClick={handleDisconnect}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={connectWallet}
                            className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Connect Wallet
                        </button>
                    )}
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="btn_white bg-white text-core-pink border border-core-pink hover:bg-core-pink hover:text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link legacyBehavior href="/login">
                            <a className="btn_white bg-white text-core-pink border border-core-pink hover:bg-core-pink hover:text-white px-4 py-2 rounded-md">
                                Login
                            </a>
                        </Link>
                    )}
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        className="text-gray-700 hover:text-blue-500 focus:outline-none"
                        onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div id="mobile-menu" className="hidden md:hidden bg-white shadow-lg">
                <nav className="px-4 py-4 space-y-4">
                    <Link legacyBehavior href="/events" passHref>
                        <a className="block text-gray-700 hover:text-blue-500">Events</a>
                    </Link>
                    <Link legacyBehavior href="/view-event" passHref>
                        <a className="block text-gray-700 hover:text-blue-500">View Events</a>
                    </Link>
                    <Link legacyBehavior href="/docs" passHref>
                        <a className="block text-gray-700 hover:text-blue-500">Docs</a>
                    </Link>
                    <Link legacyBehavior href="/pricing" passHref>
                        <a className="block text-gray-700 hover:text-blue-500">Pricing</a>
                    </Link>
                    {walletConnected ? (
                        <div className="block text-gray-700">Welcome, {username}</div>
                    ) : (
                        <button
                            onClick={connectWallet}
                            className="w-full btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Connect Wallet
                        </button>
                    )}
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="w-full btn_white bg-white text-core-pink border border-core-pink hover:bg-core-pink hover:text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link legacyBehavior href="/login">
                            <a className="w-full">
                                <button className="w-full btn_white bg-white text-core-pink border border-core-pink hover:bg-core-pink hover:text-white px-4 py-2 rounded-md">
                                    Login
                                </button>
                            </a>
                        </Link>
                    )}

                    <Link legacyBehavior href="/cart" passHref>
                        <a className="relative text-gray-700 hover:text-blue-500 flex items-center">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13h.01M17 13l1.2 6.2a2 2 0 11-2.4 1.8h-8a2 2 0 11-2.4-1.8L7 13h10z"
                                ></path>
                            </svg>
                            {items.length > 0 && (
                                <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded-full bg-red-500 text-white text-xs leading-tight text-center ml-1">
                                    {items.length}
                                </span>
                            )}
                            <span className="ml-2">Cart</span>
                        </a>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
