'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EventData } from '../../types';

const EventCard: React.FC<{ event: EventData }> = ({ event }) => {
  const { name, description, eventDate, tickets, eventImage } = event;
  const availableTickets = tickets.reduce((total, ticket) => total + ticket.quantity, 0);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (eventImage) {
      if (eventImage instanceof File) {
        const url = URL.createObjectURL(eventImage);
        setImageURL(url);
        return () => URL.revokeObjectURL(url);
      } else if (typeof eventImage === 'string') {
        setImageURL(`http://localhost:8000/${eventImage}`);
      }
    }
  }, [eventImage]);

  const viewTicketDetails = () => {
    router.push(`/events/${event._id}/`);
  };

  return (
    <div className="w-96 h-[500px] rounded-xl overflow-hidden shadow-lg bg-white border-2 border-black text-left flex flex-col">
      <div className="font-bold text-xl mb-2 mt-2 text-black ml-3 mr-3">{name}</div>
      <div className="flex justify-center ml-2 mr-2">
        {imageURL && <img className="w-full h-36 rounded-3xl object-cover" src={imageURL} alt="Event Image" />}
      </div>
      <div className="px-6 py-4 flex-grow overflow-y-auto">
        <div className={`text-gray-700 text-base ${isExpanded ? '' : 'line-clamp-3'}`}>
          {description}
        </div>
        {description.length > 100 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-pink-500 mt-2"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
        <div className="text-bold text-pink-600 my-3">
          <p>{new Date(eventDate).toLocaleDateString()}</p>
          <p>{new Date(eventDate).toLocaleTimeString()}</p>
        </div>
        <span className="bg-pink-500 text-white text-xs font-semibold inline-block py-2 px-2 leading-none whitespace-nowrap align-baseline rounded mb-2 mt-2">
          {availableTickets} tickets available
        </span>
      </div>
      <div className="px-8 pt-4 pb-2 mb-4">
        <button onClick={viewTicketDetails} className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 rounded-full transition ease-in duration-300">
          View Ticket
        </button>
      </div>
    </div>
  );
};

export default EventCard;
