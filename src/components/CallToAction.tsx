import React from 'react';

// Define a type for the props
interface CallToActionProps {
  onButtonClick: () => void;  // Define the type of the `onButtonClick` function
}

const CallToAction: React.FC<CallToActionProps> = ({ onButtonClick }) => {
  return (
    <div className="relative text-center text-white mx-auto max-w-full overflow-hidden rounded-lg mb-128"
         style={{ backgroundImage: 'url(/assets/create-event.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Responsive padding and rounded corners */}
      <div className="pb-20 mt-10 mb-68">  
        <h2 className="text-2xl font-bold mb-4">Interested in hosting your own Event?</h2>
        <p className="mb-4">Create your tickets here.</p>
        <button
          onClick={onButtonClick}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Create Events
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
