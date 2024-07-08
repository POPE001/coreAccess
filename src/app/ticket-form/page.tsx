'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '@/config';

const TicketFormContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    heardAboutEvent: '',
  });

  const attendeeInfo = {
    fullName: searchParams?.get('fullName') === 'true',
    phoneNumber: searchParams?.get('phoneNumber') === 'true',
    email: searchParams?.get('email') === 'true',
    hearAboutEvent: searchParams?.get('hearAboutEvent') === 'true',
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const ticketName = searchParams?.get('ticketName') || '';
  const eventDate = searchParams?.get('eventDate') || '';
  const eventName = searchParams?.get('eventName') || '';
  const eventAddress = searchParams?.get('eventAddress') || '';
  const eventImage = searchParams?.get('eventImage') || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const PaymentModal = ({ showModal, toggleModal }: { showModal: boolean, toggleModal: () => void }) => {
    return (
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${showModal ? 'block' : 'hidden'}`}>
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-large text-black font-bold">Payment Method</h3>
            <div className="mt-2 px-7 py-8">
              <p className="text-sm text-gray-500">Create Tickets for your Event</p>
              <button className="mt-8 w-full bg-pink-500 text-white rounded-full py-2 font-bold">Pay with NEAR</button>
              <button className="mt-8 w-full bg-white-500 text-core-pink rounded-full py-2 font-bold flex justify-center items-center border-2 border-core-pink">
                <img src="/assets/paypal-icon.svg" alt="PayPal" className="h-6 w-6 mr-2" /> Pay with PayPal
              </button>
              <button onClick={toggleModal} className="mt-8 w-full bg-pink-500 text-white rounded-full py-2 font-bold">Continue</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Submit formData to the server
    toggleModal(); // Show payment modal on form submission
  };

  return (
    <div className="container mx-auto p-4 pb-16">
      <div className="flex ml-1 mr-1">
        {eventImage && <img src={`${API_BASE_URL}/${eventImage}`} alt="Event Image" className="w-full h-60 rounded-3xl object-cover mb-4" />}
      </div>
      <header className="text-left space-y-4">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold text-black">{capitalizeFirstLetter(ticketName)}</h1>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-pink-500 w-6 h-6" />
              <span className="text-sm text-gray-600">{eventDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/assets/place.svg" alt="Place Icon" className="w-6 h-6" />
              <span className="text-sm text-gray-600">{eventAddress}</span>
            </div>
          </div>
        </div>
        <p className="text-xl text-black">for {capitalizeFirstLetter(eventName)}</p>
        <div className="col space-x-2">
          <h4 className="font-bold text-gray-800 mb-2">Hosted By</h4>
          <div className="flex items-center border border-pink-500 text-pink-500 py-1 px-4 rounded-full text-sm shadow w-60">
            <span className="h-2 w-2 bg-pink-500 rounded mr-2"></span>
            <span>{capitalizeFirstLetter(eventName)}</span>
          </div>
        </div>
      </header>
      <h2 className="text-xl text-black font-bold mt-12 mb-12">Organiser Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4 mb-16 max-h-screen overflow-y-auto">
        {attendeeInfo.fullName && (
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        {attendeeInfo.phoneNumber && (
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        {attendeeInfo.email && (
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.emailAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        {attendeeInfo.hearAboutEvent && (
          <div>
            <label className="block text-gray-700">How did you hear about this event?</label>
            <input
              type="text"
              name="hearAboutEvent"
              value={formData.heardAboutEvent}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        <button type="submit" className="w-full h-10 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out mt-8">
          Get Ticket
        </button>
        {showModal && <PaymentModal showModal={showModal} toggleModal={toggleModal} />}
      </form>
    </div>
  );
};

const TicketFormPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicketFormContent />
    </Suspense>
  );
};

export default TicketFormPage;
