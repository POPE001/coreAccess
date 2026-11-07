'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ConfirmationPage: React.FC = () => {
  const router = useRouter();

  const handleBackToEvents = () => {
    router.push('/events'); // Adjust the route as necessary
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg text-center w-full max-w-lg">
        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-6xl mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase. Your tickets have been emailed to you.</p>
        <button
          onClick={handleBackToEvents}
          className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
