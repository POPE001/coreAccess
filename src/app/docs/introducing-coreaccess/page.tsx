"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

const IntroducingCoreAccess: React.FC = () => {
    const [isHomeExpanded, setIsHomeExpanded] = useState(true);
    const toggleHomeMenu = () => {
        setIsHomeExpanded(!isHomeExpanded);
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'; // Set background color to white
        document.body.style.backgroundImage = 'none'; // Reset background image if any
    }, []);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white">
            {/* Sidebar */}
            <nav className="lg:w-1/4 w-full bg-white p-4 lg:min-h-screen lg:sticky lg:top-0 rounded-xl m-4 lg:m-0 shadow-lg relative lg:ml-28">
                <div className="absolute inset-0 rounded-xl border-[1px] border-transparent bg-gradient-to-br from-purple-600 to-pink-500 -z-10"></div>
                <div className="absolute inset-[1px] rounded-xl bg-white z-10"></div>
                <ul className="space-y-4 relative z-20">
                    <li className="flex justify-between items-center">
                        <button
                            className="text-purple-600 font-semibold hover:underline w-full text-left flex justify-between items-center"
                            onClick={toggleHomeMenu}
                        >
                            HOME
                            {isHomeExpanded ? <FaChevronDown className="text-purple-600" /> : <FaChevronRight className="text-purple-600" />}
                        </button>
                    </li>
                    {isHomeExpanded && (
                        <>
                            <li className="flex justify-between items-center pl-4">
                                <Link href="#introduction" className="text-gray-800 hover:text-purple-600 w-full">
                                    INTRODUCTION
                                </Link>
                                <FaChevronRight className="text-gray-800 hover:text-purple-600" />
                            </li>
                            <li className="flex justify-between items-center pl-4">
                                <Link href="#basics" className="text-gray-800 hover:text-purple-600 w-full">
                                    BASICS
                                </Link>
                                <FaChevronRight className="text-gray-800 hover:text-purple-600" />
                            </li>
                            <li className="flex justify-between items-center pl-4">
                                <Link href="#advanced" className="text-gray-800 hover:text-purple-600 w-full">
                                    ADVANCED
                                </Link>
                                <FaChevronRight className="text-gray-800 hover:text-purple-600" />
                            </li>
                            <li className="flex justify-between items-center pl-4">
                                <Link href="#ticketing" className="text-gray-800 hover:text-purple-600 w-full">
                                    TICKETING
                                </Link>
                                <FaChevronRight className="text-gray-800 hover:text-purple-600" />
                            </li>
                            <li className="flex justify-between items-center pl-4">
                                <Link href="#coming-soon" className="text-gray-800 hover:text-purple-600 w-full">
                                    COMING SOON
                                </Link>
                                <FaChevronRight className="text-gray-800 hover:text-purple-600" />
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-12">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
                        INTRODUCING
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        COREACCESS
                    </h2>
                </div>
                <section id="introduction" className="mb-12">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-black">INTRODUCTION</h3>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
                        CoreAccess is a groundbreaking platform that harnesses the power of blockchain technology to transform the event ticketing industry. By leveraging the decentralized and secure nature of blockchain, CoreAccess provides a robust and transparent ticketing solution that benefits both event organizers and attendees.
                    </p>
                    <p className="text-gray-700 mt-4 text-sm sm:text-base md:text-lg lg:text-xl">
                        With CoreAccess, event organizers can set transparent and fair pricing for their tickets, eliminating the need for hidden fees and charges. The platform's blockchain-based architecture ensures that all transactions are recorded on a public ledger, making it impossible for ticket prices to be manipulated or altered.
                    </p>
                    <p className="text-gray-700 mt-4 text-sm sm:text-base md:text-lg lg:text-xl">
                        Attendees can purchase tickets with complete confidence, knowing that they are getting a fair deal. The platform's secure authentication process ensures that tickets are genuine and cannot be counterfeited or duplicated. Additionally, the transparent ticketing process allows attendees to track their tickets in real-time.
                    </p>
                </section>

                <section id="basics" className="mb-12">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-black">BASICS</h3>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
                        CoreAccess is a groundbreaking platform that harnesses the power of blockchain technology to transform the event ticketing industry. By leveraging the decentralized and secure nature of blockchain, CoreAccess provides a robust and transparent ticketing solution that benefits both event organizers and attendees.
                    </p>
                    <p className="text-gray-700 mt-4 text-sm sm:text-base md:text-lg lg:text-xl">
                        With CoreAccess, event organizers can set transparent and fair pricing for their tickets, eliminating the need for hidden fees and charges. The platform's blockchain-based architecture ensures that all transactions are recorded on a public ledger, making it impossible for ticket prices to be manipulated or altered.
                    </p>
                    <p className="text-gray-700 mt-4 text-sm sm:text-base md:text-lg lg:text-xl">
                        Attendees can purchase tickets with complete confidence, knowing that they are getting a fair deal. The platform's secure authentication process ensures that tickets are genuine and cannot be counterfeited or duplicated. Additionally, the transparent ticketing process allows attendees to track their tickets in real-time.
                    </p>
                </section>
                {/* Additional sections like ADVANCED, TICKETING, COMING SOON can be added similarly */}
            </main>
        </div>
    );
};

export default IntroducingCoreAccess;
