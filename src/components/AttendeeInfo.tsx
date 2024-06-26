'use client';
import React, { useState, useEffect } from 'react';

interface AttendeeInfoProps {
  eventData: EventData;
  updateEventData: (newData: Partial<EventData>) => void;
  onContinue: () => void;
}

interface AttendeeInfoState {
  emailAddress: boolean;
  fullName: boolean;
  phoneNumber: boolean;
  heardAboutEvent: boolean;
}

interface EventData {
  attendeeInfo: AttendeeInfoState;
  // other properties for different steps can be included here
}

const AttendeeInfo: React.FC<AttendeeInfoProps> = ({ eventData, updateEventData, onContinue }) => {
  const [attendeeInfo, setAttendeeInfo] = useState<AttendeeInfoState>({
    emailAddress: eventData?.attendeeInfo?.emailAddress || false,
    fullName: eventData?.attendeeInfo?.fullName || false,
    phoneNumber: eventData?.attendeeInfo?.phoneNumber || false,
    heardAboutEvent: eventData?.attendeeInfo?.heardAboutEvent || false,
  });

  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF';
    document.body.style.backgroundImage = 'none';
  }, []);

  const handleToggle = (key: keyof AttendeeInfoState) => {
    setAttendeeInfo(prev => {
      const newValue = { ...prev, [key]: !prev[key] };
      updateEventData({ attendeeInfo: newValue });
      return newValue;
    });
  };

  const renderToggleSwitch = (label: string, key: keyof AttendeeInfoState) => {
    const id = label.toLowerCase().replace(/ /g, '-');
    return (
      <div className="flex justify-between items-center my-4" onClick={() => handleToggle(key)}>
        <label htmlFor={id} className="text-md flex-1 mr-4">{label}</label>
        <div className="relative inline-block w-14 h-8 rounded-full" style={{ backgroundColor: attendeeInfo[key] ? '#ED1F8E' : 'gray' }}>
          <input
            type="checkbox"
            id={id}
            className="opacity-0 w-0 h-0"
            checked={attendeeInfo[key]}
            readOnly
          />
          <span className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${attendeeInfo[key] ? 'transform translate-x-7' : ''}`} style={{ transition: 'transform 0.3s' }}></span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg max-w-full md:max-w-3xl lg:max-w-4xl mx-auto my-12 border-2 border-black">
      <h1 className="text-xl font-semibold mb-6 text-center text-black">Create an Event - Attendee Info</h1>
      <div className="space-y-4 text-black">
        {renderToggleSwitch('Email Address', 'emailAddress')}
        {renderToggleSwitch('Full Name', 'fullName')}
        {renderToggleSwitch('Phone Number', 'phoneNumber')}
        {renderToggleSwitch('How Did You Hear About Our Event?', 'heardAboutEvent')}
      </div>
      <div className="flex justify-center mt-8">
        <button onClick={onContinue} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-8 md:px-10 rounded-full transition ease-in duration-300">
          Continue
        </button>
      </div>
    </div>
  );
};

export default AttendeeInfo;
