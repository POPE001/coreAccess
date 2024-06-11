"use client"
// Footer.tsx
import Image from 'next/image';
import ClientButton from '../app/styles/ClientButton'; 

const Footer = () => {
    return (
        <footer className="bg-dark-blue text-white text-center p-12 fixed bottom-0 w-full flex justify-between items-center px-10">
            <div className="flex items-center">
                <Image src="/assets/logo.svg" alt="Core Access Logo" width={50} height={50} />
                <span className="ml-2 font">Core Access</span>
            </div>
            <ClientButton />
        </footer>
    );
};

export default Footer;
