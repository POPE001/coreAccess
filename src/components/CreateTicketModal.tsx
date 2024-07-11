"use client"

import React, { useState, useRef } from 'react';
import { PulseLoader } from 'react-spinners';
import { Ticket } from '../../types';

interface CreateTicketModalProps {
  onClose: () => void;
  onAddTicket: (ticket: Ticket) => void;
  eventName: string;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ onClose, onAddTicket, eventName }) => {
  const [ticketName, setTicketName] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [salesStart, setSalesStart] = useState('');
  const [salesEnd, setSalesEnd] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const [numTickets, setNumTickets] = useState('');
  const [maxPerPerson, setMaxPerPerson] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleBrowseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!ticketName) newErrors.ticketName = 'Ticket Name is required';
    if (!ticketDescription) newErrors.ticketDescription = 'Ticket Description is required';
    if (!salesStart) newErrors.salesStart = 'Sales Start Date is required';
    if (!salesEnd) newErrors.salesEnd = 'Sales End Date is required';
    if (!validFrom) newErrors.validFrom = 'Valid From Date is required';
    if (!validTo) newErrors.validTo = 'Valid To Date is required';
    if (!numTickets) newErrors.numTickets = 'Number of Tickets is required';
    if (!ticketPrice) newErrors.ticketPrice = 'Ticket Price is required';
    return newErrors;
  };

  const handleAddTicket = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const newTicket: Ticket = {
      name: ticketName,
      description: ticketDescription,
      price: parseFloat(ticketPrice),
      quantity: parseInt(numTickets),
      maxPerPerson: maxPerPerson ? parseInt(maxPerPerson) : undefined,
      salesStart: salesStart ? new Date(salesStart) : undefined,
      salesEnd: salesEnd ? new Date(salesEnd) : undefined,
      validFrom: validFrom ? new Date(validFrom) : undefined,
      validTo: validTo ? new Date(validTo) : undefined,
      event: eventName,
      ticketImage: fileInputRef.current?.files?.[0] || undefined,
      _id: ''
    };

    setTimeout(() => {
      onAddTicket(newTicket);
      onClose();
      setLoading(false);
    }, 2000); // simulate a 2-second delay for the loading spinner
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-3xl mx-4 md:mx-auto my-6 border-2 border-black">
      <h1 className="text-xl font-semibold mb-6 text-center">Create a Ticket for {eventName}</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Name</label>
          <input
            type="text"
            value={ticketName}
            onChange={e => setTicketName(e.target.value)}
            className={`block w-full px-3 py-2 border rounded-md text-black ${errors.ticketName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Type here"
          />
          {errors.ticketName && <p className="text-red-500 text-xs mt-1">{errors.ticketName}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Description</label>
          <textarea
            value={ticketDescription}
            onChange={e => setTicketDescription(e.target.value)}
            className={`block w-full px-3 py-2 border rounded-md text-black ${errors.ticketDescription ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Type here"
          />
          {errors.ticketDescription && <p className="text-red-500 text-xs mt-1">{errors.ticketDescription}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Sales Available From</label>
            <input
              type="date"
              value={salesStart}
              onChange={e => setSalesStart(e.target.value)}
              className={`block w-full px-3 py-2 border rounded-md text-black ${errors.salesStart ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.salesStart && <p className="text-red-500 text-xs mt-1">{errors.salesStart}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Sales Available To</label>
            <input
              type="date"
              value={salesEnd}
              onChange={e => setSalesEnd(e.target.value)}
              className={`block w-full px-3 py-2 border rounded-md text-black ${errors.salesEnd ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.salesEnd && <p className="text-red-500 text-xs mt-1">{errors.salesEnd}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Valid From</label>
            <input
              type="date"
              value={validFrom}
              onChange={e => setValidFrom(e.target.value)}
              className={`block w-full px-3 py-2 border rounded-md text-black ${errors.validFrom ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.validFrom && <p className="text-red-500 text-xs mt-1">{errors.validFrom}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Valid To</label>
            <input
              type="date"
              value={validTo}
              onChange={e => setValidTo(e.target.value)}
              className={`block w-full px-3 py-2 border rounded-md text-black ${errors.validTo ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.validTo && <p className="text-red-500 text-xs mt-1">{errors.validTo}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Number of Tickets</label>
            <input
              type="number"
              value={numTickets}
              onChange={e => setNumTickets(e.target.value)}
              className={`block w-full px-3 py-2 border rounded-md text-black ${errors.numTickets ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.numTickets && <p className="text-red-500 text-xs mt-1">{errors.numTickets}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Maximum Tickets per Person</label>
            <input
              type="number"
              value={maxPerPerson}
              onChange={e => setMaxPerPerson(e.target.value)}
              className={`block w-full px-3 py-2 border rounded-md text-black ${errors.maxPerPerson ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.maxPerPerson && <p className="text-red-500 text-xs mt-1">{errors.maxPerPerson}</p>}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Price (NEAR)</label>
          <input
            type="text"
            value={ticketPrice}
            onChange={e => setTicketPrice(e.target.value)}
            className={`block w-full px-3 py-2 border rounded-md text-black ${errors.ticketPrice ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.ticketPrice && <p className="text-red-500 text-xs mt-1">{errors.ticketPrice}</p>}
        </div>
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="Ticket Preview" className="mb-4 max-w-xs" />
          ) : (
            <p className="text-gray-700 mb-2">Browse or drag and drop the image here</p>
          )}
          <button onClick={handleBrowseClick} type="button" className="bg-white border rounded-md px-4 py-2 text-gray-700 border-2 border-black">
            Browse
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddTicket}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-10 rounded-full transition ease-in duration-300 flex items-center"
            disabled={loading}
          >
            {loading ? <PulseLoader size={10} color={"#fff"} /> : 'Add Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicketModal;
