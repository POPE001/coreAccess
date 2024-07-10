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
}

export const subscribe = async (data: SubscribeData, token: string) => {
  try {
    console.log("Sending subscription data:", data); // Log the data being sent
    const response = await axios.post(`${API_BASE_URL}/pricing/subscribe`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Subscription error response:", error.response?.data); // Log the error response
    if (error.response) {
      throw new Error(error.response.data.message || 'Subscription failed');
    } else {
      throw new Error('Network Error');
    }
  }
};
