"use client"
import { useState } from 'react';
import EventsView from '../components/EventsView'; 
import Link from 'next/link';

const Home = () => {

    const [isConnected, setIsConnected] = useState(false);
    const handleConnectWallet = () => {
        setIsConnected(true);
      };
    
    const gradientStyle = {
        background: 'linear-gradient(90deg, rgba(237,31,142,1) 0%, rgba(109,40,217,1) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline'
    };

    return (
        <div className="bg-white text-black text-center p-4 sm:p-10 flex flex-col items-center justify-center min-h-screen">
        {!isConnected ? (
            <>
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                    <span>REVOLUTIONIZING </span><br className="hidden md:inline" />
                    <span style={gradientStyle}>EVENT TICKETING</span><br />
                    WITH WEB3
                </h2>
                <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-md sm:max-w-lg">
                    Discover a seamless and engaging ticketing experience for both event organizers and attendees
                </p>
                <Link href="/create-wallet">
               
                <button  className="bg-core-pink text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 ease-in-out hover:bg-pink-700">
                    Connect Wallet
                </button>

                </Link>
            </>
        ) : (
            <EventsView />
        )}
    </div>

    );
};

export default Home;
