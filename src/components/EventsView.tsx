'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import sweetalert2
import EventCard from '../components/ViewEventCard';
import SearchBox from '../components/SearchBox';
import CallToAction from '../components/CallToAction';
import CreateEvent from '../components/CreateEvent';
import AttendeeInfo from '../components/AttendeeInfo';
import AvailableTicket from '../components/AvailableTicket';
import PaymentOptions from '../components/PaymentOptions';
import { getEvents, createEvent } from '../../services/eventService';
import { EventData, EventDetails } from '../../types/index';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';

const EventsView = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = initial view, 1 = create event, 2 = attendee info
  const [events, setEvents] = useState<EventData[]>([]); // State to store the events fetched from API
  const router = useRouter();
  const { user } = useAuth();

  const initialState: EventData = {
    name: '',
    description: '',
    address: '',
    eventDate: '',
    eventDetails: {
      address: '',
      name: '',
      description: '',
      eventDate: '',
    },
    tickets: [], // Ensure tickets is initialized as an empty array
    attendeeInfo: {
      emailAddress: false,
      fullName: false,
      phoneNumber: false,
      heardAboutEvent: false // Initialize with default values
    },
    paymentOptions: {
      near: false,
      stripe: false,
      paymentMethods: []
    },
    createdBy: ''
  };

  const [eventData, setEventData] = useState<EventData>(initialState);

  const updateEventData = (newData: Partial<EventData>) => {
    setEventData(prev => ({
      ...prev,
      ...newData,
      eventDetails: {
        ...prev.eventDetails,
        ...newData.eventDetails
      },
      attendeeInfo: {
        ...prev.attendeeInfo,
        ...newData.attendeeInfo
      },
      paymentOptions: {
        ...prev.paymentOptions,
        ...newData.paymentOptions
      },
      tickets: newData.tickets ? [...newData.tickets] : [...prev.tickets]
    }));
  };

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF'; // Set background color to white
    document.body.style.backgroundImage = 'none'; // Reset background image if any
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'You must be logged in to create an event',
        text: 'Please log in to continue.'
      });
    } else {
      setCurrentStep(1); // Move to create event step
    }
  };

  const handleAttendeeInfo = () => {
    setCurrentStep(2); // Move to attendee info step
  };

  const handleAvailableTicket = () => {
    setCurrentStep(3); // Move to available ticket step
  };

  const handlePaymentOptions = () => {
    setCurrentStep(4); // Move to payment options step
  };

  const handleFinalSubmit = async () => {
    console.log("Submitting event data:", eventData);
    const formData = new FormData();

    // Append all simple text data
    formData.append('name', eventData.name);
    formData.append('description', eventData.description);
    formData.append('address', eventData.address);
    formData.append('eventDate', eventData.eventDate);

    // Append complex objects as JSON strings
    formData.append('attendeeInfo', JSON.stringify(eventData.attendeeInfo));
    formData.append('paymentOptions', JSON.stringify(eventData.paymentOptions));

    // Append tickets array as JSON string
    formData.append('tickets', JSON.stringify(eventData.tickets));


    // Append images if there are any
    if (eventData.eventImage) {
      formData.append('eventImage', eventData.eventImage);
    }

    // Log the formData contents for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Validate form data before submitting
    if (!eventData.name || !eventData.description || !eventData.address || !eventData.eventDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // Make the API call
    try {
      const result = await createEvent(formData);
      if ('message' in result && result.message !== 'Event created successfully') {
        throw new Error(result.message);
      }
      console.log('Event created successfully:', result);
      router.push('/view-event');
    } catch (error: any) {
      console.error('Failed to create event:', error.message);
      alert(error.message || 'An error occurred while creating the event.');
    }
  };

  // const handleSearch = (query: string) => {
  //   fetchEvents(query);
  // };

  return (
    <div className="container mx-auto px-4 mb-6">
      {currentStep === 0 && <>
        {/* <SearchBox onSearch={handleSearch} /> */}
        <div className="flex flex-wrap justify-between">
          <div className="flex-1 min-w-0 lg:flex">
            <div className="w-full lg:w-3/4 space-y-4 pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
              <CallToAction onButtonClick={handleCreateEvent} />
            </div>
            <div className="w-full lg:w-1/4 lg:pl-4 space-y-4">
              {/* <TopOrganizers />
              <TopEvents /> */}
            </div>
          </div>
        </div>
      </>}

      {currentStep === 1 && <div className="flex justify-center items-center min-h-screen">
        <CreateEvent eventData={eventData} updateEventData={updateEventData} onContinue={handleAttendeeInfo} />
      </div>}

      {currentStep === 2 && <div className="flex justify-center items-center min-h-screen">
        <AttendeeInfo eventData={eventData} updateEventData={updateEventData} onContinue={handleAvailableTicket} />
      </div>}

      {currentStep === 3 && <div className="flex justify-center items-center min-h-screen">
        {eventData && eventData.tickets && (
          <AvailableTicket eventData={eventData} updateEventData={updateEventData} onContinue={handlePaymentOptions} />
        )}
      </div>}

      {currentStep === 4 && <div className="flex justify-center items-center min-h-screen">
        <PaymentOptions eventData={eventData} updateEventData={updateEventData} onContinue={handleFinalSubmit} />
      </div>}
    </div>
  );
};

export default EventsView;
