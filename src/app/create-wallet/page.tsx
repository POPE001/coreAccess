"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

const SelectAccountID = () => {

  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF'; // Set background color to white
    document.body.style.backgroundImage = 'none'; // Reset background image if any
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className=" rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Select account ID</h1>
        <p className="text-gray-700 mb-8">
          Enter a unique Account ID to link to your NEAR account, which will be used for all transactions and asset management.
        </p>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700" htmlFor="accountId">Account ID</label>
          <div className="bg-pink-100 text-pink-500 py-2 px-4 rounded mt-2">
            SamuelTheBrains.near
          </div>
        </div>
        <div className="text-gray-700 mb-8">
          <p>Your account ID can contain any of the following:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Lowercase characters (a-z)</li>
            <li>Digits (0-9)</li>
            <li>Characters (_ -) can be used as separators</li>
          </ul>
          <p className="mt-4">Your account ID CANNOT contain:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Characters "@" or "."</li>
            <li>Fewer than 2 characters</li>
            <li>More than 64 characters (including .near)</li>
          </ul>
        </div>
        <Link href="passphrase">
          <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full transition ease-in duration-300 w-full sm:w-auto">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectAccountID;
