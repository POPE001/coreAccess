"use client"
import React, { useState } from 'react';

interface AttendeeInfoProps {
  onContinue: () => void;
}

const AttendeeInfo: React.FC<AttendeeInfoProps> = ({ onContinue }) => {
  const [emailAddress, setEmailAddress] = useState(true);
  const [fullName, setFullName] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [heardAboutEvent, setHeardAboutEvent] = useState(false);

  return (
    <div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg max-w-full md:max-w-3xl lg:max-w-4xl mx-auto my-12 border-2 border-black">
      <h1 className="text-xl font-semibold mb-6 text-center text-black">Create an Event</h1>
      <h2 className="text-lg font-semibold mb-4 text-center text-black">Attendee Info</h2>
      <div className="flex justify-center mb-8">
        <ol className="flex space-x-2 md:space-x-4 text-gray-500">
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">1</span>
            <span className="ml-2 hidden sm:inline">Event Info</span>
          </li>
          <li className="flex items-center">
            <span className="bg-blue-800 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">2</span>
            <span className="ml-2 hidden sm:inline">Attendee Info</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">3</span>
            <span className="ml-2 hidden sm:inline">Tickets</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">4</span>
            <span className="ml-2 hidden sm:inline">Payment</span>
          </li>
        </ol>
      </div>
      <p className="text-md mb-4 text-center text-black">Choose the information you want to collect from attendees:</p>
      <form>
        <div className="space-y-6 text-black">
          {renderToggleSwitch('Email address', emailAddress, setEmailAddress)}
          {renderToggleSwitch('Full Name', fullName, setFullName)}
          {renderToggleSwitch('Phone Number', phoneNumber, setPhoneNumber)}
          {renderToggleSwitch('How did you hear about our event?', heardAboutEvent, setHeardAboutEvent)}
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={onContinue} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-8 md:px-10 rounded-full transition ease-in duration-300">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

function renderToggleSwitch(label: string | number | bigint | boolean, value: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>>) {
    // Check if label is a string and convert it to a valid ID
    const id = typeof label === 'string' ? label.toLowerCase().replace(/ /g, '-') : '';
  
    return (
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-md flex-1 mr-2">{label}</label>
        <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id={id}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            checked={value}
            onChange={() => setValue(!value)}
          />
          <label htmlFor={id} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
      </div>
    );
}

export default AttendeeInfo;
