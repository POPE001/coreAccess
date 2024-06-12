"use client"
import React, { useState } from 'react';
import EventCard from './EventCard';
import SearchBox from './SearchBox';
import TopOrganizers from './TopOrganizers';
import TopEvents from './TopEvents';
import CallToAction from './CallToAction';
import CreateEvent from './CreateEvent';
import AttendeeInfo from './AttendeeInfo';
import AvailableTicket from './AvailableTicket';
import PaymentOptions from './PaymentOptions';

const EventsView = () => {
    const [currentStep, setCurrentStep] = useState(0); // 0 = initial view, 1 = create event, 2 = attendee info

    const handleCreateEvent = () => {
        setCurrentStep(1); // Move to create event step
    };

    const handleAttendeeInfo = () => {
        setCurrentStep(2); // Move to attendee info step
    };

    const handleAvaiableTicket = () => {
        setCurrentStep(3); // Move to attendee info step
    };


    const handlePaymentOptions = () => {
        setCurrentStep(4); // Move to attendee info step
    };

    return (
        <div className="container mx-auto px-4 mb-6">
            {currentStep === 0 && <>
                <SearchBox />
                <div className="flex flex-wrap justify-between">
                    <div className="flex-1 min-w-0 lg:flex"> 
                        <div className="w-full lg:w-3/4 space-y-4 pr-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <EventCard key={index} />
                                ))}
                            </div>
                            <CallToAction onButtonClick={handleCreateEvent} />
                        </div>
                        <div className="w-full lg:w-1/4 lg:pl-4 space-y-4">
                            <TopOrganizers />
                            <TopEvents />
                        </div>
                    </div>
                </div>
            </>}

            {currentStep === 1 && <div className="flex justify-center items-center min-h-screen">
                <CreateEvent onContinue={handleAttendeeInfo} />
            </div>}

            {currentStep === 2 && <div className="flex justify-center items-center min-h-screen">
                <AttendeeInfo onContinue={handleAvaiableTicket} />
            </div>}

            {currentStep === 3 && <div className="flex justify-center items-center min-h-screen">
                <AvailableTicket onContinue={handlePaymentOptions} />
            </div>}

            {currentStep === 4 && <div className="flex justify-center items-center min-h-screen">
                <PaymentOptions onContinue={() => console.log('Proceed to the next step')} />
            </div>}

        </div>
    );
};

export default EventsView;
