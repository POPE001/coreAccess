"use client";
import React, { useState, useRef } from 'react';
import { AttendeeInfo, PaymentOptions, Ticket } from '../../types';
import { PulseLoader } from 'react-spinners';

interface EventDetails {
  [key: string]: any;
  address: string;
  name: string;
  description: string;
  eventDate: string;
}

interface EventData {
  name: string;
  description: string;
  address: string;
  eventDate: string;
  eventDetails: EventDetails;
  eventImage?: File | string;
  tickets: Ticket[];
  attendeeInfo: AttendeeInfo;
  paymentOptions: PaymentOptions;
}

interface CreateEventProps {
  eventData: EventData;
  updateEventData: (newData: Partial<EventData>) => void;
  onContinue: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ eventData, updateEventData, onContinue }) => {
  const [eventDetails, setEventDetails] = useState<EventDetails>(eventData.eventDetails || {
    name: '',
    description: '',
    address: '',
    eventDate: '',
  });

  const [eventImage, setEventImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
    updateEventData({ eventDetails: { ...eventDetails, [name]: value } });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEventImage(file);
      updateEventData({ eventImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click(); // Safely trigger the file input dialog
  };

  const validateFields = (): string[] => {
    const errors: string[] = [];
    Object.entries(eventDetails).forEach(([key, value]) => {
      if ((typeof value === 'string' && value.trim() === '') || (typeof value === 'number' && value <= 0)) {
        errors.push(key);
      }
    });
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateFields();
    if (errors.length === 0) {
      setLoading(true);
      updateEventData({
        ...eventDetails,
        eventDetails,
        eventImage: eventImage || undefined,
      });
      onContinue();
    } else {
      setErrors(errors);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 border-2 border-black">
        <h3 className="text-2xl font-bold mb-8 text-center text-black">Create an Event</h3>
        
        <div className="flex justify-center mb-8">
          <ol className="flex space-x-2 md:space-x-4 text-gray-500">
            <li className="flex items-center">
              <span className="bg-blue-800 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">1</span>
              <span className="ml-2 hidden sm:inline">Event Info</span>
            </li>
            <li className="flex items-center">
              <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">2</span>
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

        <form className='mb-200' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
              Event Name
            </label>
            <input
              id="eventName"
              type="text"
              name='name'
              value={eventDetails.name}
              onChange={handleChange}
              placeholder="Type here"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black ${errors.includes('name') && 'border-red-500'}`}
            />
            {errors.includes('name') && <p className="text-red-500 text-xs mt-1">Event name is required.</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDescription">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              placeholder="Type here"
              name="description"
              value={eventDetails.description}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 border-2 border-black ${errors.includes('description') && 'border-red-500'}`}
            />
            {errors.includes('description') && <p className="text-red-500 text-xs mt-1">Event description is required.</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventAddress">
              Event Address
            </label>
            <input
              id="eventAddress"
              type="text"
              name='address'
              value={eventDetails.address}
              onChange={handleChange}
              placeholder="Type here"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black ${errors.includes('address') && 'border-red-500'}`}
            />
            {errors.includes('address') && <p className="text-red-500 text-xs mt-1">Event address is required.</p>}
          </div>

          <div className="mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                Event Date
              </label>
              <input
                id="eventDate"
                type="date"
                name='eventDate'
                value={eventDetails.eventDate}
                onChange={handleChange}
                min={getCurrentDate()}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black ${errors.includes('eventDate') && 'border-red-500'}`}
              />
              {errors.includes('eventDate') && <p className="text-red-500 text-xs mt-1">Event date is required.</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventArtwork">
              Event Artwork
            </label>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center border-2 border-black">
              <input
                id="eventArtwork"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="mb-4 max-w-xs max-h-40" />
              ) : (
                <img src="/assets/drop-drop.svg" alt="Drag and drop icon" className="mb-4" />
              )}
              <p className="text-gray-700 mb-2 text-center">Browse or drag and drop <br /> the image here</p>
              <button onClick={handleBrowseClick} className="bg-white border rounded-md px-4 py-2 text-gray-700 border-2 border-black">
                Browse
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-4 pb-10 mb-20">
            <button
              type="submit"
              className="bg-pink-500 text-white font-bold py-2 px-8 md:px-10 rounded-full transition ease-in duration-300 flex items-center"
            >
              {loading && <PulseLoader size={10} color={"#fff"} />}
              {!loading && 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
