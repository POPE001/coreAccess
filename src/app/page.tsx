"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainSection from '../components/Home';
import SecurePassphrase from '../components/SecurePassphrase';

const Home: React.FC = () => {
  const [showPassphrase, setShowPassphrase] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = showPassphrase ? '#FFFFFF' : 'transparent';
    document.body.style.backgroundImage = showPassphrase ? 'none' : ''; // Reset to default or specific styles
  }, [showPassphrase]);

  return (
    <div>
      <Head>
        <title>CoreAccess</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <meta name="description" content="Revolutionizing Event Ticketing with Web3" />
        {/* Correct path and rel attributes for favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showPassphrase ? (
        <SecurePassphrase />
      ) : (
        <>
          <MainSection />
          
        </>
      )}
    </div>
  );
};

export default Home;
