"use client"

import React, { useState, useEffect } from 'react';
import { EventData } from '../../types';

interface PaymentOptionsProps {
  eventData: EventData;
  updateEventData: (newData: Partial<EventData>) => void;
  onContinue: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ eventData, updateEventData, onContinue }) => {
  const [nearPayment, setNearPayment] = useState(eventData.paymentOptions?.near || false);
  const [stripePayment, setStripePayment] = useState(eventData.paymentOptions?.stripe || false);

  useEffect(() => {
    updateEventData({
      paymentOptions: {
        near: nearPayment,
        stripe: stripePayment,
        paymentMethods: [
          ...(nearPayment ? ['NEAR'] : []),
          ...(stripePayment ? ['Stripe'] : [])
        ]
      }
    });
  }, [nearPayment, stripePayment]);

  const ToggleSwitch: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
    <div className="flex justify-between items-center my-4">
      <label htmlFor={label.toLowerCase().replace(/\s+/g, '-') + "-toggle"} className="text-md text-black">{label}</label>
      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          id={label.toLowerCase().replace(/\s+/g, '-') + "-toggle"}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={label.toLowerCase().replace(/\s+/g, '-') + "-toggle"} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 md:p-8 lg:p-12 rounded-lg shadow-lg max-w-full md:max-w-3xl lg:max-w-5xl mx-4 md:mx-auto my-6 border-2 border-black">
      <h1 className="text-xl font-bold mb-8 text-center text-black">Create an Event</h1>
      <div className="flex justify-center mb-8">
        <ol className="flex space-x-2 md:space-x-4 text-gray-500">
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">1</span>
            <span className="ml-2 hidden sm:inline text-black">Event Info</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">2</span>
            <span className="ml-2 hidden sm:inline text-black">Attendee Info</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">3</span>
            <span className="ml-2 hidden sm:inline text-black">Tickets</span>
          </li>
          <li className="flex items-center">
            <span className="bg-blue-800 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">4</span>
            <span className="ml-2 hidden sm:inline text-black">Payment</span>
          </li>
        </ol>
      </div>
      <h2 className="text-lg font-semibold mb-4 text-left text-black">Payment Options</h2>
      <div className="space-y-4 text-left">
        <ToggleSwitch label="NEAR Payment" checked={nearPayment} onChange={() => setNearPayment(!nearPayment)} />
        <ToggleSwitch label="Stripe Payment" checked={stripePayment} onChange={() => setStripePayment(!stripePayment)} />
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={onContinue}
          className={`bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-10 rounded-full transition ease-in duration-300 ${!nearPayment && !stripePayment ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!nearPayment && !stripePayment}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
