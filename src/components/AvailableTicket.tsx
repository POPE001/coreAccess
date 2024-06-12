import React, { useState } from 'react';
import CreateTicketModal from './CreateTicketModal';

interface AvailableTicketInfoProps {
  onContinue: () => void;
}

const AvailableTicket: React.FC<AvailableTicketInfoProps> = ({ onContinue }) => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleOpenModal = () => {
    setShowModal(true); // Function to open modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Function to close modal
  };

  return (
    <div className="bg-white p-8 md:p-16 lg:p-24 rounded-lg shadow-lg max-w-full lg:max-w-4xl xl:max-w-6xl mx-auto my-12 border-2 border-black">
      <h1 className="text-xl font-semibold mb-6 text-center text-black">Create an Event</h1>
      <div className="flex justify-center mb-8">
        {/* Progress indicators */}
        <ol className="flex space-x-2 md:space-x-4 text-gray-500">
          {/* Steps indicators */}
        </ol>
      </div>
      <div className="flex justify-center mb-8">
        <ol className="flex space-x-2 md:space-x-4 text-gray-500">
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">1</span>
            <span className="ml-2 hidden sm:inline">Event Info</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">2</span>
            <span className="ml-2 hidden sm:inline">Attendee Info</span>
          </li>
          <li className="flex items-center">
            <span className="bg-blue-800 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">3</span>
            <span className="ml-2 hidden sm:inline">Tickets</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">4</span>
            <span className="ml-2 hidden sm:inline">Payment</span>
          </li>
        </ol>
      </div>
      <h2 className="text-lg font-semibold mb-4 text-center text-black">Create Tickets for your Event</h2>
      {!showModal && (
        <>
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
            <p className="text-gray-700 mb-2">There is no ticket available</p>
            <button
              onClick={handleOpenModal}
              className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded border-2 border-black"
            >
              Create Ticket
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onContinue}
              className="bg-pink-500 text-white font-bold py-2 px-8 md:px-10 rounded-full transition ease-in duration-300"
            >
              Continue
            </button>
          </div>
        </>
      )}
      {showModal && (
        <CreateTicketModal
          onClose={handleCloseModal}
          onContinue={() => console.log('Continue with further actions')}
        />
      )}
    </div>
  );
};

export default AvailableTicket;
