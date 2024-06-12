"use client"
import React, { useState } from 'react';
import Link from 'next/link';

interface EventTicketProps {
  type: string;
  description: string;
  limit: number;
  imageUrl: string;  // Added imageUrl to props for dynamic image handling
}

const EventTicket: React.FC<EventTicketProps> = ({ type, description, limit, imageUrl }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => (c < limit ? c + 1 : c));
  const decrement = () => setCount(c => (c > 0 ? c - 1 : c));

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col items-center space-y-4 w-full max-w-sm border border-black">
      <img src={imageUrl} alt={type} className="rounded-lg mb-4 w-full" />
      <h3 className="text-lg text-black font-semibold">{type}</h3>
      <p className='text-black'>{description}</p>
      <div className="flex items-center space-x-2">
      <button onClick={decrement} disabled={count >= limit} className="text-lg px-3 py-1 bg-white text-black rounded shadow cursor-pointer disabled:opacity-50 border-2 border-black">-</button>
        <span className="text-lg text-black font-medium">{count}</span>
        <button onClick={increment} disabled={count >= limit} className="text-lg px-3 py-1 bg-white text-black rounded shadow cursor-pointer disabled:opacity-50 border-2 border-black">+</button>
      </div>
      <p className="text-sm text-black">Limited to {limit} per account</p>
      <Link href="ticket-form">
      <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-2 w-80 rounded-xl">Get Tickets</button>

      </Link>
    </div>
  );
};

export default EventTicket;
