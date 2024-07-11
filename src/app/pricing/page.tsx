'use client';

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionTiers from '../../components/SubscriptionTiers';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PricingPage: React.FC = () => {
  // Add a console log to debug
  console.log('Stripe Promise:', stripePromise);

  return (
    <Elements stripe={stripePromise}>
      <SubscriptionTiers />
    </Elements>
  );
};

export default PricingPage;
