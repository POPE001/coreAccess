'use client';

import React from 'react';
import Swal from 'sweetalert2';

interface CallToActionProps {
  onButtonClick: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onButtonClick }) => {
  const handleButtonClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'You must be logged in to create an event',
        text: 'Please log in to continue.'
      });
    } else {
      onButtonClick();
    }
  };

  return (
    <div className="relative text-center text-white mx-auto max-w-full overflow-hidden rounded-lg mb-128"
         style={{ backgroundImage: 'url(/assets/create-event.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="pb-20 mt-10 mb-68">
        <h2 className="text-2xl font-bold mb-4">Interested in hosting your own Event?</h2>
        <p className="mb-4">Create your tickets here.</p>
        <button
          onClick={handleButtonClick}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Create Events
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
