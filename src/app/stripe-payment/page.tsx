'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { PulseLoader } from 'react-spinners';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const StripePaymentForm: React.FC = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch the client secret from your API when the component mounts
    const fetchClientSecret = async () => {
      const { data } = await axios.post(`${API_BASE_URL}/payments/stripe`, {
        // Include necessary data for your payment request
        ticketId: 'ticketId',  // Replace with actual ticketId
        eventId: 'eventId',    // Replace with actual eventId
        ticketCount: 1         // Replace with actual ticketCount
      });
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  const handleStripePayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('CardElement not found');
      return;
    }

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    setLoading(false);

    if (result.error) {
      console.error(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
      // Handle post-payment success actions here
      router.push('/confirmation-page');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <PulseLoader color="#fff" />
          <div className="text-white text-lg ml-4">Processing your payment...</div>
        </div>
      )}
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
        <div className="mt-4">
          <CardElement />
        </div>
        <button
          onClick={handleStripePayment}
          className="w-full h-10 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out mt-8"
          disabled={!stripe || loading}
        >
          {loading ? <PulseLoader color="#fff" size={8} /> : 'Pay'}
        </button>
      </div>
    </div>
  );
};

const StripePaymentPage: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm />
    </Elements>
  );
};

export default StripePaymentPage;
