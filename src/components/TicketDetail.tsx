import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL, API_BASE_URL } from '@/config';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
  email: string;
}

interface Attendee {
  _id: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  heardAboutEvent: string;
  ticketCount: number;
  totalPrice: number;
}

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
    emailAddress: boolean;
    heardAboutEvent: boolean;
  };
  event: {
    _id: string;
    eventDate: string;
    name: string;
    eventImage: string;
    description: string;
    address: string;
    createdBy: string;
  };
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, attendeeInfo, event }) => {
  const [ticketCount, setTicketCount] = useState(0);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [totalCount, setTotalCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (ticket.ticketImage instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(ticket.ticketImage);
    } else if (typeof ticket.ticketImage === 'string') {
      setImageSrc(`${BASE_URL}/${ticket.ticketImage}`);
    } else {
      setImageSrc(undefined);
    }
  }, [ticket.ticketImage]);

  useEffect(() => {
    setTotalCount(ticketCount); // Update the total count whenever ticketCount changes
  }, [ticketCount]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Fetched User:', response.data); // Debug log
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user && user._id === event.createdBy) {
      const fetchAttendees = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/events/${event._id}/attendees`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Fetched Attendees:', response.data); // Debug log
          setAttendees(response.data);
        } catch (error) {
          console.error('Failed to fetch attendees:', error);
        }
      };

      fetchAttendees();
    }
  }, [user, event.createdBy, event._id]);

  if (!user) {
    return <div>Loading...</div>; // Or show a loading spinner
  }

  console.log('Event Object:', event); // Debug log the entire event object
  console.log('Event createdBy:', event.createdBy); // Debug log
  console.log('Logged in user id:', user._id); // Debug log

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
      eventId: event._id,
      fullName: String(attendeeInfo.fullName),
      phoneNumber: String(attendeeInfo.phoneNumber),
      emailAddress: String(attendeeInfo.emailAddress),
      heardAboutEvent: String(attendeeInfo.heardAboutEvent),
      ticketCount: String(ticketCount),
    }).toString();

    router.push(`/ticket-form?${queryParams}`);
  };

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg w-full shadow-md flex flex-col items-center mt-4 mb-16 max-h-screen overflow-y-auto ticket-detail">
      {imageSrc ? (
        <img src={imageSrc} alt={ticket.name} className="w-full h-40 object-cover rounded-lg mb-4 ticket-image" />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center ticket-image">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <h2 className="text-lg font-bold mb-2">{ticket.name}</h2>
      <p className="text-gray-600 mb-4">{ticket.description}</p>
      <p className="text-red-800 mb-4">${ticket.price}</p>

      {user && event.createdBy && user._id === event.createdBy ? (
        <div>
          <h3 className="text-lg font-bold mb-2">Attendee Details</h3>
          {attendees.length > 0 ? (
            attendees.map(att => (
              <div key={att._id} className="border-b border-gray-200 py-2">
                <p className="text-sm"><strong>Name:</strong> {att.fullName}</p>
                <p className="text-sm"><strong>Email:</strong> {att.emailAddress}</p>
                <p className="text-sm"><strong>Phone:</strong> {att.phoneNumber}</p>
                <p className="text-sm"><strong>Heard About Event:</strong> {att.heardAboutEvent}</p>
                <p className="text-sm"><strong>Tickets Purchased:</strong> {att.ticketCount}</p>
                <p className="text-sm"><strong>Total Price:</strong> ${att.totalPrice}</p>
              </div>
            ))
          ) : (
            <p>No attendees have registered yet.</p>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center space-x-2 mt-2">
            <button onClick={decrement} disabled={ticketCount <= 0} className="bg-gray-200 text-gray-900 px-2 py-1 rounded">
              -
            </button>
            <span>{ticketCount}</span>
            <button onClick={increment} disabled={ticketCount >= (ticket.maxPerPerson || ticket.quantity)} className="bg-gray-200 text-gray-900 px-2 py-1 rounded">
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Limited to {ticket.maxPerPerson || ticket.quantity} per account</p>
          <p className="text-lg text-gray-500 mt-2 font-bold">Total Price: ${totalCount * ticket.price}</p>
          <button onClick={handleGetTickets} disabled={ticketCount === 0} className={`mt-4 text-white font-bold py-2 px-4 rounded-full ${ticketCount === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-700'}`}>
            Get Tickets
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
