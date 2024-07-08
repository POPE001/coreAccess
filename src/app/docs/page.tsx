"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CoreAccess from '../../../public/assets/introducing-core-access.svg';
import CoreAccessTicketing from '../../../public/assets/ticketing.svg';

const Docs: React.FC = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'; // Set background color to white
        document.body.style.backgroundImage = 'none'; // Reset background image if any
    }, []);

    const articles = [
        {
            title: "Introducing CoreAccess",
            description: "Revolutionizing event access with decentralized technology",
            imageUrl: CoreAccess,
            link: "/docs/introducing-coreaccess",
        },
        {
            title: "Ticketing 3.0",
            description: "CoreAccess Leads the Charge in Decentralized Events",
            imageUrl: CoreAccessTicketing,
            link: "/docs/ticketing-3",
        },
    ];

    return (
        <div className="py-8 sm:py-16 bg-white mb-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-4">
                    COREACCESS
                </h1>
                <h2 className="text-2xl sm:text-4xl font-semibold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    DOCUMENTATIONS
                </h2>
                <p className="text-center font-bold text-black mb-12">
                    BUILD DECENTRALIZED APPLICATIONS AND UNLOCK SEAMLESS BLOCKCHAIN INTERACTIONS
                </p>

                <div className="grid gap-8 sm:grid-cols-2">
                    {articles.map((article, index) => (
                        <Link legacyBehavior href={article.link} key={index}>
                            <a className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="relative w-full h-48 sm:h-60">
                                    <Image
                                        src={article.imageUrl}
                                        alt={article.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{article.title}</h3>
                                    <p className="mt-2 text-sm sm:text-base text-gray-700">{article.description}</p>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Docs;
