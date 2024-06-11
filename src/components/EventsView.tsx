import React from 'react';
import EventCard from './EventCard';

const EventsView = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Dummy data for illustration; replace with actual data fetch */}
          {Array.from({ length: 4 }).map((_, index) => (
            <EventCard key={index} />
          ))}
        </div>
      </div>
      <div className="text-center mt-10 w-full">
        <button className="btn bg-purple-500 hover:bg-purple-700 text-white">
          Interested in hosting your own Event? Create your tickets here.
        </button>
      </div>
    </div>
  );
};

export default EventsView;
