import React, { useState } from 'react';
import Link from 'next/link';

interface PaymentOptionsProps {
  onContinue: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ onContinue }) => {
  const [nearPayment, setNearPayment] = useState(false);
  const [paypalPayment, setPaypalPayment] = useState(false);

  return (
    <div className="bg-white p-8 md:p-16 lg:p-30 rounded-lg shadow-lg max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto my-12 border-2 border-black">
      <h1 className="text-xl font-bold mb-8 text-center">Create an Event</h1>
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
          <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">3</span>
            <span className="ml-2 hidden sm:inline">Tickets</span>
          </li>
          <li className="flex items-center">
          <span className="bg-blue-800 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">4</span>

            <span className="ml-2 hidden sm:inline">Payment</span>
          </li>
        </ol>
      </div>
      <h2 className="text-lg font-semibold mb-4 text-left">Payment Options</h2>
      <div className="space-y-4 text-left">
        <div className="flex justify-between items-center">
          <label htmlFor="nearPayment" className="text-md">NEAR Payment</label>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id="nearPayment"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              checked={nearPayment}
              onChange={() => setNearPayment(!nearPayment)}
            />
            <label htmlFor="nearPayment" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="paypalPayment" className="text-md">PayPal</label>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id="paypalPayment"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              checked={paypalPayment}
              onChange={() => setPaypalPayment(!paypalPayment)}
            />
            <label htmlFor="paypalPayment" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Link href="view-event">
        <button onClick={onContinue} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-10 rounded-full transition ease-in duration-300">
          Continue
        </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentOptions;
