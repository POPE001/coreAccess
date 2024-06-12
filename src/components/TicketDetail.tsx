import { useState } from 'react';

interface Ticket {
    id: number;
    title: string;
    description: string;
    limit: number;
  }
  
  interface TicketDetailProps {
    ticket: Ticket;
  }
  

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket }) => {
  const [ticketCount, setTicketCount] = useState(0);

  const increment = () => {
    if (ticketCount < ticket.limit) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decrement = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
    }
  };

  return (
    <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{ticket.title}</h2>
      <p>{ticket.description}</p>
      <div className="flex items-center space-x-2 mt-2">
        <button onClick={decrement} disabled={ticketCount <= 0}>-</button>
        <span>{ticketCount}</span>
        <button onClick={increment} disabled={ticketCount >= ticket.limit}>+</button>
      </div>
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Tickets
      </button>
    </div>
  );
};

export default TicketDetail;
