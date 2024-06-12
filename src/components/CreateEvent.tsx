import React from 'react';

interface CreateEventProps {
  onContinue: () => void; // Define the type of the `onContinue` function
}

const CreateEvent: React.FC<CreateEventProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="w-full max-w-full md:max-w-3xl lg:max-w-5xl bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 mx-4 border-2 border-black">
        <h3 className="text-2xl font-bold mb-8 text-center text-black">Create an Event</h3>
        
        <div className="flex justify-center mb-8">
          <ol className="flex space-x-2 md:space-x-4 text-gray-500">
            <li className="flex items-center">
              <span className="bg-blue-800 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold">1</span>
              <span className="ml-2 hidden sm:inline">Event Info</span>
            </li>
            <li className="flex items-center">
              <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">2</span>
              <span className="ml-2 hidden sm:inline">Attendee Info</span>
            </li>
            <li className="flex items-center">
              <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">3</span>
              <span className="ml-2 hidden sm:inline">Tickets</span>
            </li>
            <li className="flex items-center">
              <span className="bg-gray-300 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center font-bold">4</span>
              <span className="ml-2 hidden sm:inline">Payment</span>
            </li>
          </ol>
        </div>

        <form className='mb-200'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
              Event Name
            </label>
            <input
              id="eventName"
              type="text"
              placeholder="Type here"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDescription">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              placeholder="Type here"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 border-2 border-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketSalesFrom">
                Ticket Sales Available From
              </label>
              <input
                id="ticketSalesFrom"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketSalesTo">
                Ticket Sales Available To
              </label>
              <input
                id="ticketSalesTo"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketValidFrom">
                Ticket Valid From
              </label>
              <input
                id="ticketValidFrom"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketValidTo">
                Ticket Valid To
              </label>
              <input
                id="ticketValidTo"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfTickets">
                Number of Tickets
              </label>
              <input
                id="numberOfTickets"
                type="number"
                placeholder="Type here"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxTicketsPerPerson">
                Maximum Tickets per Person
              </label>
              <input
                id="maxTicketsPerPerson"
                type="number"
                placeholder="Type here"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 border-black"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventArtwork">
              Event Artwork
            </label>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center border-2 border-black">
              <img src="/assets/drop-drop.svg" alt="Drag and drop icon" className="mb-4" />
              <p className="text-gray-700 mb-2 text-center">Browse or drag and drop <br /> the image here</p>
              <button className="bg-white border rounded-md px-4 py-2 text-gray-700 border-2 border-black">Browse</button>
            </div>
          </div>

          <div className="flex justify-center mt-4 pb-10 mb-20">
            <button onClick={onContinue} className="bg-pink-500 text-white font-bold py-2 px-8 md:px-10 rounded-full transition ease-in duration-300">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
