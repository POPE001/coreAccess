import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface TicketDetailProps {
  ticket: {
    _id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    ticketImage?: string | File | null;
    maxPerPerson?: number;
  };
  attendeeInfo: {
    fullName: boolean;
    phoneNumber: boolean;
    email: boolean;
    hearAboutEvent: boolean;
  };
  event: {
    eventDate: string;
    name: string;
    eventImage: string;
    description: string;
    address: string;
  };
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, attendeeInfo, event }) => {
  const [ticketCount, setTicketCount] = useState(0);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (ticket.ticketImage instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(ticket.ticketImage);
    } else if (typeof ticket.ticketImage === 'string') {
      setImageSrc(`http://localhost:8000/${ticket.ticketImage}`);
    } else {
      setImageSrc(undefined);
    }
  }, [ticket.ticketImage]);

  const increment = () => {
    if (ticketCount < (ticket.maxPerPerson || ticket.quantity)) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decrement = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
    }
  };

  const handleGetTickets = () => {
    const queryParams = new URLSearchParams({
      ticketId: ticket._id,
      ticketName: ticket.name,
      eventDate: new Date(event.eventDate).toDateString(),
      eventName: event.name,
      eventDescription: event.description,
      eventAddress: event.address,
      eventImage: event.eventImage,
      fullName: String(attendeeInfo.fullName),
      phoneNumber: String(attendeeInfo.phoneNumber),
      emailAddress: String(attendeeInfo.email),
      heardAboutEvent: String(attendeeInfo.hearAboutEvent),
    }).toString();

    router.push(`/ticket-form?${queryParams}`);
  };

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg w-full shadow-md flex flex-col items-center mt-4 mb-16 max-h-screen overflow-y-auto">
      {imageSrc ? (
        <img src={imageSrc} alt={ticket.name} className="w-full h-40 object-cover rounded-lg mb-4" />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <h2 className="text-lg font-bold mb-2">{ticket.name}</h2>
      <p className="text-gray-600 mb-4">{ticket.description}</p>
      <p className="text-red-800 mb-4">${ticket.price}</p>

      <div className="flex items-center space-x-2 mt-2">
        <button
          onClick={decrement}
          disabled={ticketCount <= 0}
          className="bg-gray-200 text-gray-900 px-2 py-1 rounded"
        >
          -
        </button>
        <span>{ticketCount}</span>
        <button
          onClick={increment}
          disabled={ticketCount >= (ticket.maxPerPerson || ticket.quantity)}
          className="bg-gray-200 text-gray-900 px-2 py-1 rounded"
        >
          +
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2">Limited to {ticket.maxPerPerson || ticket.quantity} per account</p>
      <button
        onClick={handleGetTickets}
        className="mt-4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Get Tickets
      </button>
    </div>
  );
};

export default TicketDetail;
