import React from 'react';

const TopEvents = () => {
  const events = [
    "BlockBask",
    "CryptoTsunami",
    "CryptoCarnival",
    "CryptoFusion"
  ];

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
  <h3 className="font-bold text-xl mb-2 text-left">Top Events</h3>
      <ul>
        {events.map(org => (
          <li key={org} className="mb-2 last:mb-0">
            <div className="flex items-center p-2 bg-white-100 rounded-full hover:bg-pink-200 cursor-pointer transition-colors duration-300 border-2 border-core-pink">
              <span className="h-3 w-3 bg-pink-500 rounded-full mr-3"></span> {/* Pink dot */}
              <span className="text-pink-600 text-sm font-semibold">{org}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopEvents;
