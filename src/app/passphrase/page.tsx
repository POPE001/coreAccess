"use client";

import React, { useState, useEffect } from 'react';
import VerifyPassphrase from '../../components/VerifyPassphrase'; 

const SecurePassphrase = () => {
  // Example passphrase words (these should ideally be generated securely)
  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF'; // Set background color to white
    document.body.style.backgroundImage = 'none'; // Reset background image if any
  }, []);

  
  const words = ['Mango', 'Space', 'Helix', 'Coffee', 'Bicycle', 'Dragon', 'Pineapple', 'Guitar', 'Snowflake', 'Perfume', 'Llama', 'Harmonica'];
  const [verify, setVerify] = useState(false);  // State to toggle verification view

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const passphrase = words.join(' ');
    navigator.clipboard.writeText(passphrase).then(
      () => setCopied(true),
      () => setCopied(false)
    );
  };

  if (verify) {
    return <VerifyPassphrase />;  // Display verify passphrase component if state is true
  }


  return (
    <div className="bg-white p-6 rounded-lg  max-w-4xl mx-auto my-8" style={{ backgroundColor: '#fff' }}>
      <h1 className="text-black text-left text-xl font-semibold mb-4">Setup Your Secure Passphrase</h1>
      <p className="text-sm text-gray-600 mb-4">
  <span className='font-bold'>Save</span> the following words in the exact order and store them in a secure location.
  <span className="hidden lg:block"> {/* Hidden on small, block on large screens */}
  </span>
  Note that anyone who gains access to this information will also gain access to your account. You will be required to verify your passphrase next.
</p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {words.map((word, index) => (
          <div key={index} className="flex bg-pink-100 rounded p-2">
            <span className="font-bold text-core-pink">{index + 1}.</span>
            <span className="font-bold text-core-pink">{word}</span>
          </div>
        ))}
      </div>
      <button onClick={copyToClipboard} className="bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded-full transition duration-300 mx-auto block">
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <button onClick={() => setVerify(true)} className="mt-4 bg-pink-500 hover:bg-white-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 mx-auto block">
        Next
      </button>

    </div>
  );
};

export default SecurePassphrase;
