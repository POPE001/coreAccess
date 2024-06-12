"use client"
import React, { useEffect } from 'react';
import EventTicket from '@/components/EventTicket';

const EventPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF'; // Set background color to white
    document.body.style.backgroundImage = 'none'; // Reset background image if any
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 text-center">
      <div className="flex justify-center ml-1 mr-1">
        <img src="/assets/event-image.svg" alt="BlockBash Event" className="mt-4 mx-auto rounded-lg w-screen h-auto" />
      </div>
      <header className="text-left space-y-4">
      <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold text-black">BlockBash</h1>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <img src="/assets/place.svg" alt="Event Icon" className="w-6 h-6" />
              <span className="text-sm text-gray-600">Friday June 14, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/assets/place.svg" alt="Place Icon" className="w-6 h-6" />
              <span className="text-sm text-gray-600">The Garrison Event Centre, Greater Manchester</span>
            </div>
          </div>
        </div>
        <p className="text-xl text-black">A decentralized music festival celebrating <br/> crypto culture</p>
        
        <div className="col space-x-2">
        <h4 className="font-bold text-gray-800 mb-2">Hosted By</h4>
        <div className="flex items-center border border-pink-500 text-pink-500 py-1 px-4 rounded-full text-sm shadow w-40">
        <span className="h-2 w-2 bg-pink-500 rounded mr-2"></span>
        <span>BlockBash</span>
        </div>
        </div>

        
      </header>

      <div className="flex flex-wrap items-stretch gap-12 mt-24 mb-48">
      <EventTicket
  type="Crypto Collector"
  description="Join the party for free"
  limit={2}
  imageUrl="/assets/crypto-collector.svg"
/>
<EventTicket
  type="Blockchain VIP"
  description="Join the party with VIP benefits"
  limit={2}
  imageUrl="/assets/blockchain-vip.svg"
/>
      </div>
    </div>
  );
};

export default EventPage;
