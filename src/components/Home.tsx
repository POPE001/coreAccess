"use client"

import { useEffect, useState, useRef } from 'react';
import EventsView from '../components/EventsView';
import Link from 'next/link';
import { gsap } from 'gsap';

const Home = () => {
    const [isConnected, setIsConnected] = useState(false);

    const heroRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (heroRef.current && buttonRef.current) {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(heroRef.current, 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1, duration: 1.5 }
            )
            .from(buttonRef.current, 
                { opacity: 0, y: 20, duration: 0.75 }, 
                "-=0.5"  // This will start this animation 0.5 seconds before the previous ends
            );
        }
    }, []);

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
                    <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-md sm:max-w-lg">
                        Discover a seamless and engaging ticketing experience for both event organizers and attendees.
                    </p>
                </div>
            ) : (
                <EventsView />
            )}
            {!isConnected && (
                <Link legacyBehavior href="/create-wallet">
                    <a ref={buttonRef} className="bg-core-pink text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 ease-in-out hover:bg-pink-700">
                        Connect Wallet
                    </a>
                </Link>
            )}
        </div>
    );
};

export default Home;
