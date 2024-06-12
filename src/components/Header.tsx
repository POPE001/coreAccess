"use client"
import React, { useState } from 'react';
import Link from 'next/link';
// import { MenuIcon, XIcon } from '@heroicons/react/outline';
import {MinusIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";

interface HeaderProps {
  onDemoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDemoClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link legacyBehavior href="/">
            <img src="/assets/logo.svg" alt="CoreAccess Logo" className="h-8 w-auto cursor-pointer" />
          </Link>
          <button onClick={toggleMenu} className="md:hidden ml-4 focus:outline-none">
            {isMenuOpen ? (
              <MagnifyingGlassIcon className="h-6 w-6 text-black" />
            ) : (
              <MinusIcon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center justify-center flex-1`}>
<Link legacyBehavior href="/events"><a className="text-black">Events</a></Link>
<Link legacyBehavior href="/view-event"><a className="text-black">View Events</a></Link>
<Link legacyBehavior href="/docs"><a className="text-black">Docs</a></Link>
</nav>
<div className="flex space-x-8">
<Link legacyBehavior href="/create-wallet"><a className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Connect Wallet</a></Link>
<button onClick={onDemoClick} className="btn_white bg-white text-core-pink border border-core-pink hover:bg-core-pink hover:text-white px-4 py-2 rounded-md">Create Demo</button>
</div>
</div>
<style jsx>{`
@media (max-width: 768px) {
nav {
  position: absolute;
  top: 4rem;
  left: 0;
  right: 0;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
}
`}</style>
</header>
);
};

export default Header;
