import axios from 'axios';
import { API_BASE_URL } from '@/config';

enum SubscriptionTier {
  Basic = 'Basic',
  Pro = 'Pro',
  Premium = 'Premium'
}

interface SubscribeData {
  userId: string;
  tier: SubscriptionTier;
  duration: 'monthly' | 'yearly';
  paymentMethodId: string;
}

export const subscribe = async (data: SubscribeData, token: string) => {
  try {
    console.log("Sending subscription data:", data); // Log the data being sent
    const response = await axios.post(`${API_BASE_URL}/pricing/subscribe`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("Subscription response data:", response.data); // Log the successful response data
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Subscription error response:", error.response.data); // Log the error response
      throw new Error(error.response.data.message || 'Subscription failed');
    } else if (error.request) {
      console.error("No response received:", error.request); // Log if no response was received
      throw new Error('No response from server. Please check your network connection.');
    } else {
      console.error("Subscription request error:", error.message); // Log any other errors
      throw new Error('An error occurred while processing the subscription.');
    }
  }
};
