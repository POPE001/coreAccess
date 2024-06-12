"use client"

import React, { useState } from 'react';

interface CreateTicketModalProps {
  onClose: () => void;   // Function that handles the modal close
  onContinue: () => void; // Function that handles the continue action
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ onClose, onContinue }) => {
  const [ticketName, setTicketName] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [salesStart, setSalesStart] = useState('');
  const [salesEnd, setSalesEnd] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const [numTickets, setNumTickets] = useState('');
  const [maxPerPerson, setMaxPerPerson] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto my-12 border-2 border-black">
      <h1 className="text-xl font-semibold mb-6 text-center">Create a Ticket</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Name</label>
          <input
            type="text"
            value={ticketName}
            onChange={e => setTicketName(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            placeholder="Type here"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Description</label>
          <textarea
            value={ticketDescription}
            onChange={e => setTicketDescription(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            placeholder="Type here"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Sales Available</label>
            <input
              type="date"
              value={salesStart}
              onChange={e => setSalesStart(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              placeholder="From"
            />
            <input
              type="date"
              value={salesEnd}
              onChange={e => setSalesEnd(e.target.value)}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              placeholder="To"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Valid</label>
            <input
              type="date"
              value={validFrom}
              onChange={e => setValidFrom(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              placeholder="From"
            />
            <input
              type="date"
              value={validTo}
              onChange={e => setValidTo(e.target.value)}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              placeholder="To"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Number of Tickets</label>
            <input
              type="number"
              value={numTickets}
              onChange={e => setNumTickets(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Maximum Tickets per Person</label>
            <input
              type="number"
              value={maxPerPerson}
              onChange={e => setMaxPerPerson(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Price (NEAR)</label>
          <input
            type="text"
            value={ticketPrice}
            onChange={e => setTicketPrice(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
          <p className="text-gray-700 mb-2">Browse or drag and drop the image here</p>
          <button className="bg-white border rounded-md px-4 py-2 text-gray-700">Browse</button>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onContinue}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-10 rounded-full transition ease-in duration-300"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicketModal;
