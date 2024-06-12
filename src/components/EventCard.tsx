"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const EventCard = () => {


  const [showDetails, setShowDetails] = useState(false); // State to control the display of TicketDetail.



  return (
    <div className="max-w-xl rounded-xl overflow-hidden shadow-lg bg-white border-2 border-black text-left">
      <div className="font-bold text-xl mb-2 mt-2 text-black-800 ml-3 mr-3">BlockBash</div>
      <div className="flex space-x-2 mb-4 ml-3 mr-3">
        <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-2 rounded">#Blockchain</span>
        <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-2 rounded">#Music</span>
        <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-2 rounded">#Finance</span>
      </div>
      <div className="flex justify-center ml-2 mr-2">
        <img className="w-full" src="/assets/event-image.svg" alt="Event Image" />
      </div>
      <div className="px-6 py-4">
        <span className="bg-pink-500 text-white text-xs font-semibold inline-block py-2 px-2 leading-none whitespace-nowrap align-baseline rounded mb-2 mt-2">1100 of 1100 available</span>
        <p className="text-gray-700 text-base">
          A decentralized music festival celebrating crypto culture.
        </p>
        <div className="text-bold text-pink-600 my-3">
          <p>June 12</p>
          <p>5pm - 6:30pm, GMT</p>
        </div>
      </div>
      <div className="px-8 pt-4 pb-2 mb-4">
        <Link href="tickets">
        <button
          className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 rounded-full transition ease-in duration-300"
        >
          Get Tickets
        </button>
        </Link>
      
      </div>
    </div>
  );
};

export default EventCard;
