"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EventData } from '../../types';
import { BASE_URL } from '@/config';

const EventCard: React.FC<{ event: EventData }> = ({ event }) => {
  const { name, description, eventDate, tickets, eventImage } = event;
  const availableTickets = (tickets || []).reduce((total, ticket) => total + ticket.quantity, 0);
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
        setImageURL(eventImage.startsWith('http') ? eventImage : `${BASE_URL}/${eventImage}`);
      }

    }
  }, [eventImage]);

  const viewTicketDetails = () => {
    router.push(`/events/${event._id}/`);
  };

  return (
    <div className="max-w-sm w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl rounded-xl overflow-hidden shadow-lg bg-white border-2 border-black text-left flex flex-col mx-auto mb-4 transform transition-transform duration-300 hover:scale-105">
      <div className="font-bold text-xl mb-2 mt-2 text-black px-3">{name}</div>
      <div className="flex justify-center px-2">
        {imageURL && <img className="w-full h-36 sm:h-48 md:h-52 lg:h-56 xl:h-60 2xl:h-64 object-cover transition-opacity duration-500 ease-in-out" src={imageURL} alt="Event Image" />}
      </div>
      <div className="px-6 py-4 flex-grow overflow-y-auto">
        <div className={`text-gray-700 text-base ${isExpanded ? '' : 'line-clamp-3'}`}>
          {description}
        </div>
        {description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-pink-500 mt-2 transition-colors duration-300 hover:text-pink-700"
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
        <button onClick={viewTicketDetails} className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 rounded-full transition ease-in duration-300 hover:scale-105">
          View Ticket
        </button>
      </div>
    </div>
  );
};

export default EventCard;
