import { supabase } from '@/utils/supabaseClient';

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

export const subscribe = async (data: SubscribeData) => {
  try {
    console.log("Sending subscription data to Supabase:", data);
    const { data: responseData, error } = await supabase.functions.invoke('subscribe', {
      body: data
    });

    if (error) throw error;

    console.log("Subscription response data:", responseData);
    return responseData;
  } catch (error: any) {
    console.error("Subscription error:", error.message);
    throw new Error(error.message || 'Subscription failed');
  }
};

