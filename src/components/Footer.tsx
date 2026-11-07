"use client";
// Footer.tsx
import Image from 'next/image';
import ClientButton from '../app/styles/ClientButton'; 

const Footer = () => {
    return (
        <footer className="bg-dark-blue text-white p-4 md:p-6 fixed bottom-0 w-full">
            <div className="container mx-auto flex flex-row justify-between items-center space-x-4">
                {/* Left section with the logo */}
                <div className="flex items-center">
                    <Image src="/assets/logo.svg" alt="Core Access Logo" width={30} height={30} />
                    <span className="ml-2 font">Core Access</span>
                </div>
                
                {/* Right section with the button */}
                <div className="flex items-center">
                    <ClientButton />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
