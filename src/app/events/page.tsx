"use client"; // Ensure this directive is at the top

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../../components/ViewEventCard';
import CallToAction from '../../components/CallToAction';
import CreateEvent from '../../components/CreateEvent';
import AttendeeInfo from '../../components/AttendeeInfo';
import AvailableTicket from '../../components/AvailableTicket';
import PaymentOptions from '../../components/PaymentOptions';
import { getEvents } from '../../../services/eventService';
import { EventData } from '../../../types/index';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/config';

interface User {
  id: string;
  username: string;
  email: string;
}

const EventsView = () => {
    const [currentStep, setCurrentStep] = useState(0); // 0 = initial view, 1 = create event, 2 = attendee info
    const [events, setEvents] = useState<EventData[]>([]); // State to store the events fetched from API
    const [user, setUser] = useState<User | null>(null); // State to store the current user
    const router = useRouter();

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
        tickets: [],
        attendeeInfo: {
            emailAddress: false,
            fullName: false,
            phoneNumber: false,
            heardAboutEvent: false
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

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'; // Set background color to white
        document.body.style.backgroundImage = 'none'; // Reset background image if any

        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchEvents();
        fetchUser();
    }, []);

    const handleCreateEvent = () => {
        setCurrentStep(1); // Move to create event step
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

        // Append tickets array
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
            console.log('Event created successfully:', response.data);
            // Handle post-submit actions here, such as redirecting the user
            router.push('/view-event');
        } catch (error) {
            // Check if error is an Axios error
            if (axios.isAxiosError(error)) {
                console.error('Failed to create event:', error.response?.data?.message || 'Unknown error');
            } else if (error instanceof Error) {
                console.error('Failed to create event:', error.message);
            } else {
                console.error('Failed to create event:', 'An unknown error occurred');
            }
            // Handle errors, such as displaying error messages to the user
        }
    };

    return (
        <div className="container mx-auto px-4 mb-6">
            {currentStep === 0 && (
                <>
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
                        </div>
                    </div>
                </>
            )}

            {currentStep === 1 && (
                <div className="flex justify-center items-center min-h-screen">
                    <CreateEvent eventData={eventData} updateEventData={updateEventData} onContinue={handleAttendeeInfo} />
                </div>
            )}

            {currentStep === 2 && (
                <div className="flex justify-center items-center min-h-screen">
                    <AttendeeInfo eventData={eventData} updateEventData={updateEventData} onContinue={handleAvailableTicket} />
                </div>
            )}

            {currentStep === 3 && (
                <div className="flex justify-center items-center min-h-screen">
                    {eventData && eventData.tickets && (
                        <AvailableTicket eventData={eventData} updateEventData={updateEventData} onContinue={handlePaymentOptions} />
                    )}
                </div>
            )}

            {currentStep === 4 && (
                <div className="flex justify-center items-center min-h-screen">
                    <PaymentOptions eventData={eventData} updateEventData={updateEventData} onContinue={handleFinalSubmit} />
                </div>
            )}
        </div>
    );
};

export default EventsView;
