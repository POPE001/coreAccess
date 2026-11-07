import React from 'react';

const CreateTrialAccountButton: React.FC = () => {
  const createTrialAccount = async () => {
    try {
      const response = await fetch('/api/create-trial-account', { method: 'POST' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Trial account created:', data);
      alert('Trial account successfully created!');
    } catch (error) {
      console.error('Error creating trial account:', error);
      alert('Failed to create trial account');
    }
  };

  return <button onClick={createTrialAccount}>Create Trial Account</button>;
};

export default CreateTrialAccountButton;
