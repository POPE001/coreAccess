'use client';

import React, { useState, useEffect } from 'react';
import { EventData } from '../../types';
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/config';

interface PaymentOptionsProps {
  eventData: EventData;
  updateEventData: (newData: Partial<EventData>) => void;
  onContinue: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ eventData, updateEventData, onContinue }) => {
  const [nearPayment, setNearPayment] = useState(eventData.paymentOptions?.near || false);
  const [stripePayment, setStripePayment] = useState(eventData.paymentOptions?.stripe || false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    updateEventData({
      paymentOptions: {
        near: nearPayment,
        stripe: stripePayment,
        paymentMethods: [
          ...(nearPayment ? ['NEAR'] : []),
          ...(stripePayment ? ['Stripe'] : [])
        ]
      }
    });
  }, [nearPayment, stripePayment]);

  const handleContinue = async () => {
    setLoading(true);

    // Validate form data before submitting
    if (!eventData.name || !eventData.description || !eventData.address || !eventData.eventDate) {
      Swal.fire('Error', 'Please fill in all required fields.', 'error');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', eventData.name);
      formData.append('description', eventData.description);
      formData.append('address', eventData.address);
      formData.append('eventDate', eventData.eventDate);
      formData.append('attendeeInfo', JSON.stringify(eventData.attendeeInfo));
      formData.append('paymentOptions', JSON.stringify(eventData.paymentOptions));

      eventData.tickets.forEach((ticket, index) => {
        formData.append(`tickets[${index}][name]`, ticket.name);
        formData.append(`tickets[${index}][description]`, ticket.description);
        formData.append(`tickets[${index}][price]`, ticket.price.toString());
        formData.append(`tickets[${index}][quantity]`, ticket.quantity.toString());
        if (ticket.maxPerPerson !== undefined) {
          formData.append(`tickets[${index}][maxPerPerson]`, ticket.maxPerPerson.toString());
        }
        if (ticket.salesStart) {
          formData.append(`tickets[${index}][salesStart]`, ticket.salesStart.toISOString());
        }
        if (ticket.salesEnd) {
          formData.append(`tickets[${index}][salesEnd]`, ticket.salesEnd.toISOString());
        }
        if (ticket.validFrom) {
          formData.append(`tickets[${index}][validFrom]`, ticket.validFrom.toISOString());
        }
        if (ticket.validTo) {
          formData.append(`tickets[${index}][validTo]`, ticket.validTo.toISOString());
        }
        if (ticket.ticketImage) {
          formData.append(`tickets[${index}][ticketImage]`, ticket.ticketImage);
        }
      });

      if (eventData.eventImage) {
        formData.append('eventImage', eventData.eventImage);
      }

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        throw new Error('No token, authorization denied');
      }

      const response = await axios.post(`${API_BASE_URL}/events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });

      Swal.fire({
        title: 'Success',
        text: 'Event created successfully!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'View Events',
        cancelButtonText: 'Stay Here'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/view-event');
        }
      });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire('Error', error.response?.data?.message || 'Unknown error', 'error');
      } else if (error instanceof Error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire('Error', 'An unknown error occurred', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const ToggleSwitch: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
    <div className="flex justify-between items-center my-4">
      <label htmlFor={label.toLowerCase().replace(/\s+/g, '-') + "-toggle"} className="text-md text-black">{label}</label>
      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          id={label.toLowerCase().replace(/\s+/g, '-') + "-toggle"}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={label.toLowerCase().replace(/\s+/g, '-') + "-toggle"} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 md:p-8 lg:p-12 rounded-lg shadow-lg max-w-full md:max-w-3xl lg:max-w-5xl mx-4 md:mx-auto my-6 border-2 border-black">
      <h1 className="text-xl font-bold mb-8 text-center text-black">Create an Event</h1>
      <div className="flex justify-center mb-8">
        <ol className="flex space-x-2 md:space-x-4 text-gray-500">
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">1</span>
            <span className="ml-2 hidden sm:inline text-black">Event Info</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">2</span>
            <span className="ml-2 hidden sm:inline text-black">Attendee Info</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">3</span>
            <span className="ml-2 hidden sm:inline text-black">Tickets</span>
          </li>
          <li className="flex items-center">
            <span className="bg-blue-800 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">4</span>
            <span className="ml-2 hidden sm:inline text-black">Payment</span>
          </li>
        </ol>
      </div>
      <h2 className="text-lg font-semibold mb-4 text-left text-black">Payment Options</h2>
      <div className="space-y-4 text-left">
        <ToggleSwitch label="NEAR Payment" checked={nearPayment} onChange={() => setNearPayment(!nearPayment)} />
        <ToggleSwitch label="Stripe Payment" checked={stripePayment} onChange={() => setStripePayment(!stripePayment)} />
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleContinue}
          className={`bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-10 rounded-full transition ease-in duration-300 flex items-center ${!nearPayment && !stripePayment ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!nearPayment && !stripePayment || loading}
        >
          {loading ? <PulseLoader size={10} color={"#fff"} /> : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
