'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { API_BASE_URL, BASE_URL } from '@/config';
import { EventData } from '../../../types';
import { PulseLoader } from 'react-spinners';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const TicketFormContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    heardAboutEvent: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    heardAboutEvent: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [showModal, setShowModal] = useState(false);

  const attendeeInfo = {
    fullName: searchParams?.get('fullName') === 'true',
    phoneNumber: searchParams?.get('phoneNumber') === 'true',
    emailAddress: searchParams?.get('emailAddress') === 'true',
    heardAboutEvent: searchParams?.get('heardAboutEvent') === 'true',
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const ticketName = searchParams?.get('ticketName') || '';
  const eventDate = searchParams?.get('eventDate') || '';
  const eventName = searchParams?.get('eventName') || '';
  const eventAddress = searchParams?.get('eventAddress') || '';
  const eventImage = searchParams?.get('eventImage') || '';
  const ticketId = searchParams?.get('ticketId') || '';
  const eventId = searchParams?.get('eventId') || '';
  const ticketCount = parseInt(searchParams?.get('ticketCount') || '0', 10);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [event, setEvent] = useState<EventData | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error message when user starts typing
    if (value.trim() !== '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateFields = () => {
    const newErrors: any = {};
    if (attendeeInfo.fullName && !formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (attendeeInfo.phoneNumber && !formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    }
    if (attendeeInfo.emailAddress && !formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email is required';
    }
    if (attendeeInfo.heardAboutEvent && !formData.heardAboutEvent.trim()) {
      newErrors.heardAboutEvent = 'This field is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      toggleModal(); // Show payment modal on form submission
    }
  };

  const handleStripePayment = async () => {
    if (!stripe || !elements) return;

    console.log('Sending request with:', {
      ticketId,
      eventId,
      ticketCount
    });

    try {
      const { data: { clientSecret } } = await axios.post(`${API_BASE_URL}/payments/stripe`, {
        ticketId,
        eventId,
        ticketCount
      });

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        console.error('CardElement not found');
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        await saveAttendeeDetails();
        await updateTicketCount();
        toggleModal();
        router.push('/confirmation-page');
      }
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  const saveAttendeeDetails = async () => {
    const requestData = {
        ticketId,
        eventId,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
        heardAboutEvent: formData.heardAboutEvent,
        ticketCount,
    };

    console.log('Sending attendee details:', requestData);

    try {
        await axios.post(`${API_BASE_URL}/attendees/save`, requestData);
        console.log('Attendee details saved successfully!');
    } catch (error) {
        console.error('Failed to save attendee details', error);
    }
};


  const updateTicketCount = async () => {
    try {
      await axios.post(`${API_BASE_URL}/tickets/update`, {
        ticketId,
        eventId,
        ticketCount,
      });
      console.log('Ticket count updated successfully!');
    } catch (error) {
      console.error('Failed to update ticket count', error);
    }
  };


  const handleNearPayment = async () => {
    try {
      const accountId = 'dehonicore.testnet'; // Ensure this is correctly set
      const { data } = await axios.post(`${API_BASE_URL}/payments/near`, {
        ticketId,
        eventId,
        accountId,
      });

      console.log('Near Payment succeeded!', data);
      toggleModal();
      router.push('/confirmation-page');
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    if (paymentMethod === 'stripe') {
      await handleStripePayment();
    } else if (paymentMethod === 'near') {
      await handleNearPayment();
    }
    setLoading(false);
  };

  const eventImageUrl = typeof eventImage === 'string' ? eventImage : '';

  return (
    <div className="container mx-auto p-4 pb-16">
            {loading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <PulseLoader color="#fff" />
          <div className="text-white text-lg ml-4">Processing your payment...</div>
        </div>
      )}

      <div className="flex ml-1 mr-1">
        {imageURL && <img className="w-full h-36 rounded-3xl object-cover" src={imageURL} alt="Event Image" />}
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
              className={`w-full p-2 border rounded text-black ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
        )}
        {attendeeInfo.phoneNumber && (
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full p-2 border rounded text-black ${errors.phoneNumber ? 'border-red-500' : ''}`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>
        )}
        {attendeeInfo.emailAddress && (
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className={`w-full p-2 border rounded text-black ${errors.emailAddress ? 'border-red-500' : ''}`}
            />
            {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
          </div>
        )}
        {attendeeInfo.heardAboutEvent && (
          <div>
            <label className="block text-gray-700">How did you hear about this event?</label>
            <input
              type="text"
              name="heardAboutEvent"
              value={formData.heardAboutEvent}
              onChange={handleChange}
              className={`w-full p-2 border rounded text-black ${errors.heardAboutEvent ? 'border-red-500' : ''}`}
            />
            {errors.heardAboutEvent && <p className="text-red-500 text-xs mt-1">{errors.heardAboutEvent}</p>}
          </div>
        )}
        <div className="mt-8">
          <CardElement />
        </div>
        <button type="submit" className="w-full h-10 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out mt-8">
          Get Ticket
        </button>
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full block">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-large text-black font-bold">Payment Method</h3>
                <div className="mt-2 px-7 py-8">
                  <p className="text-sm text-gray-500">Choose your payment method</p>
                  <button onClick={() => setPaymentMethod('near')} className="mt-8 w-full bg-pink-500 text-white rounded-full py-2 font-bold">Pay with NEAR</button>
                  <button
                    onClick={() => setPaymentMethod('stripe')}
                    className="mt-8 w-full bg-white-500 text-core-pink rounded-full py-2 font-bold flex justify-center items-center border-2 border-core-pink"
                    disabled={loading}
                  >
                    {loading ? (
                      <PulseLoader color="#fff" size={8} />
                    ) : (
                      <>
                        <img src="/assets/paypal-icon.svg" alt="Stripe" className="h-6 w-6 mr-2" /> Pay with Stripe
                      </>
                    )}
                  </button>

                
                  <button onClick={handlePayment} className="mt-8 w-full bg-pink-500 text-white rounded-full py-2 font-bold">Continue</button>
                  {loading && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    {/* <div className="text-white text-lg">Processing your payment...</div> */}
  </div>
)}

                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

const TicketFormPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Elements stripe={stripePromise}>
        <TicketFormContent />
      </Elements>
    </Suspense>
  );
};

export default TicketFormPage;
