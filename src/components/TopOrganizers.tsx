import React from 'react';

const TopOrganizers = () => {
  const organizers = [
    "SamuelTheBrains.Near",
    "Cryptoqueen.Near",
    "Blockchainbrad.Near",
    "Cryptoking123.Near"
  ];

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <h3 className="font-bold text-xl mb-2 text-left">Top Organizers</h3>
      <ul>
        {organizers.map(org => (
          <li key={org} className="mb-2 last:mb-0">
            <div className="flex items-center p-2 bg-white-100 rounded-full hover:bg-blue-200 cursor-pointer transition-colors duration-300 border-2 border-custom-blue">
              <span className="h-3 w-3 bg-blue-500 rounded-full mr-3"></span> {/* Blue dot */}
              <span className="text-blue-600 text-sm font-semibold">{org}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopOrganizers;
