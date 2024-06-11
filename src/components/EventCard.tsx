import React from 'react';

const EventCard = () => {
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-white border-2 border-black text-left">
      <div className="flex justify-center">
        <img className="w-4/4" src="/assets/event-image.svg" alt="Event Image" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-purple-800">BlockBash</div>
        <div className="flex space-x-2 mb-4">
          <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">#Blockchain</span>
          <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">#Music</span>
          <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">#Finance</span>
        </div>
 
        <span className="bg-pink-500 text-white text-xs font-semibold inline-block py-2 px-2 leading-none whitespace-nowrap align-baseline rounded">1100 of 1100 available</span>

        <p className="text-gray-700 text-base">
          A decentralized music festival celebrating crypto culture.
        </p>

        <div className="text-bold text-pink-600 my-3">
          <p>June 12</p>
          <p>5pm - 6:30pm, GMT</p>
        </div>
      </div>

      <div className="px-6 pt-4 pb-2">
        <button className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition ease-in duration-300">
          Get Tickets
        </button>
      </div>
    </div>
  );
};

export default EventCard;
