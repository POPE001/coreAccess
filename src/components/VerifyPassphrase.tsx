"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const VerifyPassphrase = () => {
  // State to store user inputs for verification
  const [word7, setWord7] = useState('');
  const [word12, setWord12] = useState('');


  const verifyWords = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Verifying:', word7, word12);
    // Suppose verification logic goes here and is successful:
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto my-12">
      <h1 className="text-black text-xl font-semibold mb-4">Verify Your Passphrase</h1>
      <p className="mb-4">What is word Number 7 and Number 12?</p>
      <form onSubmit={verifyWords} className="space-y-6">
        <div>
          <label htmlFor="word7" className="block text-sm font-medium text-gray-700">What is word Number 7</label>
          <input
            type="text"
            id="word7"
            value={word7}
            onChange={(e) => setWord7(e.target.value)}
            style={{ backgroundColor: '#FCE7F3', color: '#DB2777', caretColor: '#DB2777' }}  // Custom style for pink appearance
            className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-core-pink focus:border-core-pink sm:text-sm"
            placeholder="Type here"
            required
          />
        </div>
        <div>
          <label htmlFor="word12" className="block text-sm font-medium text-gray-700">What is word Number 12</label>
          <input
            type="text"
            id="word12"
            value={word12}
            onChange={(e) => setWord12(e.target.value)}
            style={{ backgroundColor: '#FCE7F3', color: '#DB2777', caretColor: '#DB2777' }}  // Custom style for pink appearance
            className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-core-pink focus:border-core-pink sm:text-sm"
            placeholder="Type here"
            required
          />
        </div>
        <Link href="events">
        <button
          className="w-4/4 flex justify-center py-2 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-core-pink hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-core-pink mt-10"
        >
          Continue
        </button>
        </Link>
        
      </form>
    </div>
  );
};

export default VerifyPassphrase;
