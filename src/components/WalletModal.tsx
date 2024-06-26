// import React from 'react';

// interface WalletModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConnect: (walletType: string) => void;
// }

// const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl px-12 py-24 ">
//         <div className="flex justify-between items-center border-b border-gray-300 px-6 py-4">
//           <div className="flex space-x-4">
//             <h3 className="text-xl font-medium">Connect your wallet</h3>
//             <h3 className="text-xl font-medium">What is a Wallet?</h3>
//           </div>
//           <button onClick={onClose} className="rounded-md p-1.5 hover:bg-gray-200">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <div className="px-6 py-12">
//           <div className="grid grid-cols-2 gap-2">
//             <div className="grid grid-cols-1 gap-4">
//               <button onClick={() => onConnect('meteor')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <img src="/assets/meteor-wallet.svg" alt="Meteor Wallet" className="w-10 h-10 mr-2" />
//                 <span className="text-sm font-semibold text-gray-900">Meteor Wallet</span>
//               </button>
//               <button onClick={() => onConnect('near')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <img src="/assets/near-wallet.svg" alt="MyNear Wallet" className="w-10 h-10 mr-2" />
//                 <span className="text-sm font-semibold text-gray-900">MyNear Wallet</span>
//               </button>
//             </div>
//             <div className="grid grid-cols-1 gap-4">
//               <div className="flex items-center">
//                 <img src="/assets/key-icon.svg" alt="Secure Assets" className="w-10 h-10 mr-2" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-900">Secure & Manage Your Digital Assets</h4>
//                   <p className="text-sm text-gray-500">Safely store and transfer your crypto and NFTs.</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <img src="/assets/login-near.svg" alt="Log In" className="w-10 h-10 mr-2" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-900">Log In to Any NEAR App</h4>
//                   <p className="text-sm text-gray-500">No need to create new accounts or credentials. Connect your wallet and you are good to go!</p>
//                 </div>
//               </div>
//               <div className="flex justify-center my-4">
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get a Wallet</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { setupWalletSelector, WalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupSender } from '@near-wallet-selector/sender';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import '@near-wallet-selector/modal-ui/styles.css';

interface WalletModalProps {
  onWalletConnect: (username: string) => void;
  walletConnected: boolean;
  username: string;
  onDisconnect: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({
  onWalletConnect,
  walletConnected,
  username,
  onDisconnect,
}) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<any>(null);

  useEffect(() => {
    async function initWalletSelector() {
      const selector = await setupWalletSelector({
        network: 'testnet',
        modules: [
          setupSender(),
          setupMyNearWallet(),
          setupLedger(),
          setupMeteorWallet(),
        ],
      });

      const modal = setupModal(selector, {
        contractId: 'dehoni.testnet',
      });

      setSelector(selector);
      setModal(modal);
    }

    initWalletSelector();
  }, []);

  const connectWallet = async () => {
    if (modal) {
      modal.show();
      modal.on('connect', (data: { username: string }) => {
        onWalletConnect(data.username);
      });
    }
  };

  return (
    <>
      {walletConnected ? (
        <div className="flex items-center space-x-4">
          <span className='text-black'>Welcome, {username}</span>
          <button onClick={onDisconnect} className="text-red-500">Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet} className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Connect Wallet</button>
      )}
    </>
  );
};

export default WalletModal;
