"use client"
import React, { useState, useEffect } from 'react';

const BlockchainVIPForm = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'; // Set background color to white
        document.body.style.backgroundImage = 'none'; // Reset background image if any
      }, []);

      const [showModal, setShowModal] = useState(false);
      const toggleModal = () => {
        setShowModal(!showModal);
    };

    const PaymentModal = () => {
        return (
            <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${showModal ? 'block' : 'hidden'}`}>
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-large text-black font-bold">Payment Method</h3>
                        <div className="mt-2 px-7 py-8">
                            <p className="text-sm text-gray-500">Create Tickets for your Event</p>
                            <button className="mt-8 w-full bg-pink-500 text-white rounded-full py-2 font-bold">Pay with NEAR</button>
                            <button className="mt-8 w-full bg-white-500 text-core-pink rounded-full py-2 font-bold flex justify-center items-center border-2 border-core-pink">
    <img src="/assets/paypal-icon.svg" alt="PayPal" className="h-6 w-6 mr-2" /> Pay with PayPal
</button>

                            <button onClick={toggleModal} className="mt-8 w-full bg-pink-500 text-white rounded-full py-2 font-bold">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    const [formData, setFormData] = useState({
        fullName: '',
        discovery: '',
        email: '',
        phone: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(formData); // In real application, you'd likely send this data to a server
    };

    return (
        <div className="max-w-4xl mx-auto p-4 ">
        <div className="flex  ml-1 mr-1">
          <img src="/assets/event-image.svg" alt="BlockBash Event" className="mt-4 mx-auto rounded-lg w-screen h-auto" />
        </div>
        <header className="text-left space-y-4">
      <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold text-black">BlockBash VIP Ticket</h1>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <img src="/assets/place.svg" alt="Event Icon" className="w-6 h-6" />
              <span className="text-sm text-gray-600">Friday June 14, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/assets/place.svg" alt="Place Icon" className="w-6 h-6" />
              <span className="text-sm text-gray-600">The Garrison Event Centre, Greater Manchester</span>
            </div>
          </div>
        </div>
        <p className="text-xl text-black">for BlockBash</p>
        
        <div className="col space-x-2">
        <h4 className="font-bold text-gray-800 mb-2">Hosted By</h4>
        <div className="flex items-center border border-pink-500 text-pink-500 py-1 px-4 rounded-full text-sm shadow w-40">
        <span className="h-2 w-2 bg-pink-500 rounded mr-2"></span>
        <span>BlockBash</span>
        </div>
        </div>

        
      </header>
      <h2 className="text-xl text-black font-bold mt-12 mb-12">Organiser Question</h2>

      <form onSubmit={handleSubmit} className="space-y-12 mb-48">
                    <div>
                        <label className="block text-black text-lg">Full Name</label>
                        <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange}
                        placeholder='SamuelTheBrains.near' 
                        className="w-full text-black p-2 rounded border-2 border-black w-full" />
                    </div>
                    <div>
                        <label className="block text-black text-lg">How did you find out about the event?</label>
                        <input 
                        type="text" 
                        name="discovery" 
                        value={formData.discovery} 
                        onChange={handleChange} 
                        placeholder='SamuelTheBrains.near' 
                        className="w-full text-black p-2 rounded border-2 border-black w-full" />
                    </div>
                    <div>
                        <label className="block text-black text-lg">Email address</label>
                        <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder='SamuelTheBrains.near' 
                        className="w-full text-black p-2 rounded border-2 border-black w-full" />
                    </div>
                    <div>
                        <label className="block text-black text-lg">Phone Number (for SMS confirmation)</label>
                        <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder='SamuelTheBrains.near' 
                        className="w-full text-black p-2 rounded border-2 border-black w-full" />
                    </div>
                    <button onClick={toggleModal} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">Get Ticket</button>
            {showModal && <PaymentModal />}
                </form>

        </div>
    );
};

export default BlockchainVIPForm;
