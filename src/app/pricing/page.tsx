import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import tickCircle from '../../../public/assets/tick-circle.svg';
import { useWallet } from '../../context/WalletContext';
import { subscribe } from '../../../services/subscriptionService';
// import { useAuth } from '../../context/authContext'; // Assuming you have an AuthContext to provide user information

enum SubscriptionTier {
  Basic = 'Basic',
  Pro = 'Pro',
  Premium = 'Premium'
}
type Duration = 'monthly' | 'yearly';

const SubscriptionTiers: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('Host');
  const [selectedDuration, setSelectedDuration] = useState<Duration>('monthly');
  const router = useRouter();
  const { walletConnected, connectWallet } = useWallet();
  // const { user } = useAuth(); // Assuming you have an AuthContext to provide user information

  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF';
    document.body.style.backgroundImage = 'none';
  }, []);

  const handleSubscribe = async () => {
    if (selectedTier) {
      if (!walletConnected) {
        await connectWallet();
      }
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      // if (!user || !user.id) {
      //   console.error('No user found');
      //   return;
      // }

      // const data = {
      //   userId: user.id, // Use the actual user ID
      //   tier: selectedTier,
      //   duration: selectedDuration  // Ensured to be either 'monthly' or 'yearly'
      // };

      try {
        // await subscribe(data, token);
        console.log(`Subscribed to ${selectedTier} as ${selectedRole}`);
        router.push('/');
      } catch (error) {
        console.error('Subscription failed', (error as Error).message);
      }
    } else {
      console.log('Please select a tier to subscribe.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white to-white py-12 px-4 sm:px-6 lg:px-8 mb-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">SUBSCRIPTION</h1>
      <h2 className="text-2xl font-bold text-core-pink mb-6">TIERS</h2>
      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => setSelectedRole('Host')}
          className={`px-4 py-2 rounded-full border-2 ${selectedRole === 'Host' ? 'border-core-pink bg-core-pink text-white' : 'border-gray-300 text-gray-700'}`}
        >
          Host
        </button>
        <button
          onClick={() => setSelectedRole('Attendee')}
          className={`px-4 py-2 rounded-full border-2 ${selectedRole === 'Attendee' ? 'border-core-pink bg-core-pink text-white' : 'border-gray-300 text-gray-700'}`}
        >
          Attendee
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full mb-6">
        {Object.values(SubscriptionTier).map((tier) => (
          <div
            key={tier}
            onClick={() => setSelectedTier(tier as SubscriptionTier)}
            className={`p-8 rounded-lg shadow-lg cursor-pointer text-center ${selectedTier === tier ? 'border-4 border-core-pink bg-pink-200' : 'border border-gray-300 bg-white'}`}
          >
            <h3 className="text-xl font-bold mb-4">{tier}</h3>
            <p className="text-core-pink text-lg mb-4">
              {tier === SubscriptionTier.Basic && '$0 (0 NEAR)/monthly'}
              {tier === SubscriptionTier.Pro && '$15 (3 NEAR)/monthly billed at $150 (30 NEAR)/year'}
              {tier === SubscriptionTier.Premium && '$35 (7 NEAR)/monthly billed at $350 (70 NEAR)/year'}
            </p>
            <p className="text-gray-700 mb-4">
              {tier === SubscriptionTier.Basic && 'Explore, discover, and purchase tickets to incredible events on Core Access. Our platform ensures a safe and seamless experience, putting the power of choice in your hands.'}
              {tier === SubscriptionTier.Pro && 'Elevate your event experience with Core Access Pro. Get early access to in-demand tickets, enjoy reduced fees on most purchases, and unlock exclusive content drops.'}
              {tier === SubscriptionTier.Premium && 'Become an event insider with Core Access Premium. Score front-row seats with priority access, save big with eliminated fees, snag limited-edition NFTs, and join a vibrant fan community.'}
            </p>
            <div className="flex items-center space-x-2 mb-2">
              {selectedTier === tier && (
                <Image alt='tick' src={tickCircle} className="h-5 w-5 text-core-pink" />
              )}
              <label className="font-bold text-core-pink">Fee Structure</label>
            </div>
            <p className="text-gray-700">
              {tier === SubscriptionTier.Basic && (
                <>
                  <Image alt='tick' src={tickCircle} className="h-5 w-5 text-core-pink inline-block mr-2" />
                  '$2 fixed fee + 5-10% based on ticket price tier.'
                </>
              )}
              {tier === SubscriptionTier.Pro && (
                <>
                  <Image alt='tick' src={tickCircle} className="h-5 w-5 text-core-pink inline-block mr-2" />
                  '$1 fixed fee and a 3-5% percentage'
                </>
              )}
              {tier === SubscriptionTier.Premium && 'No fees on tickets <$800, heavily discounted for tickets >$800.'}
            </p>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedTier(null)}
          className="w-32 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSubscribe}
          className="w-32 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-core-pink hover:bg-core-pink-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-core-pink"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscriptionTiers;
