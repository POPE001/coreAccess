"use client";
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import EventsView from '../components/EventsView';
import { useWallet } from '../context/WalletContext';
import Spinner from '../components/Spinner'; // Import the Spinner component
import '../css/Home.css'; // Ensure this CSS file is created and imported

const Home = () => {
    const [loading, setLoading] = useState(true);
    const { walletConnected, username, connectWallet } = useWallet();
    const heroRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Simulate a loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="bg-white text-black text-center p-4 sm:p-10 flex flex-col items-center justify-center min-h-screen">
            <CSSTransition
                in={!walletConnected}
                timeout={500}
                classNames="fade"
                nodeRef={heroRef}
                unmountOnExit
            >
                <div ref={heroRef}>
                    <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                        <span>REVOLUTIONIZING </span><br className="hidden md:inline" />
                        <span style={{
                            background: 'linear-gradient(90deg, rgba(237,31,142,1) 0%, rgba(109,40,217,1) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline'
                        }}>EVENT TICKETING</span><br />
                    </h2>
                    <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-md sm:max-w-lg mx-auto">
                        Discover a seamless and engaging ticketing experience for both event organizers and attendees.
                    </p>
                    <CSSTransition
                        in={!walletConnected}
                        timeout={500}
                        classNames="slide"
                        nodeRef={buttonRef}
                        unmountOnExit
                    >
                        <button ref={buttonRef} onClick={connectWallet} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Connect Wallet</button>
                    </CSSTransition>
                </div>
            </CSSTransition>
            {walletConnected && (
                <EventsView />
            )}
        </div>
    );
};

export default Home;
