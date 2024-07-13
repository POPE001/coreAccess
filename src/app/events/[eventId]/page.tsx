'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TicketDetail from '../../../components/TicketDetail'; // Adjust the import path if necessary
import { EventData, Ticket } from '../../../../types';
import { API_BASE_URL, BASE_URL } from '@/config';

export default function EventDetailsPage() {
  const { eventId } = useParams() as { eventId: string };
  const [event, setEvent] = useState<EventData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (eventId) {
      fetchEventDetails(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    if (event && event.eventImage) {
      const eventImage = event.eventImage;
      if (eventImage instanceof File) {
        const url = URL.createObjectURL(eventImage);
        setImageURL(url);
        return () => URL.revokeObjectURL(url);
      } else if (typeof eventImage === 'string') {
        setImageURL(`${BASE_URL}/${eventImage}`);
      }
    }
  }, [event]);

  const fetchEventDetails = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`);
      const result = await response.json();
      if (response.ok && result._id) {
        setEvent(result);
      } else {
        setError('Event not found');
      }
    } catch (error) {
      console.error('Fetching error:', error);
      setError('An error occurred while fetching event details');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!event) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const { _id, eventImage, name, description, eventDate, address, tickets, attendeeInfo } = event;
  const eventImageUrl = typeof eventImage === 'string' ? eventImage : '';

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="bg-white rounded-lg p-6 mb-6">
        {imageURL && <img className="w-full h-36 rounded-3xl object-cover" src={imageURL} alt="Event Image" />}

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{name}</h1>
            <p className="text-gray-700 mb-6">{description}</p>
          </div>
          <div className="text-right text-gray-600">
            <p className="mb-2">📅 {new Date(eventDate).toDateString()}</p>
            <p>📍 {address}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Tickets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tickets.length > 0 ? (
            tickets.map((ticket: Ticket) => (
              <TicketDetail 
                key={ticket._id}
                ticket={{
                  _id: ticket._id,
                  name: ticket.name,
                  description: ticket.description,
                  quantity: ticket.quantity,
                  price: ticket.price,
                  ticketImage: ticket.ticketImage || null,
                  maxPerPerson: ticket.maxPerPerson
                }} 
                attendeeInfo={attendeeInfo}
                event={{
                  _id: _id ?? '', // Ensure event ID is always a string
                  eventDate,
                  name,
                  eventImage: eventImageUrl || '', // Ensure eventImage is always a string
                  description,
                  address
                }} // Pass event information as an object
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700">No tickets available for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
}
