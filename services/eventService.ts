import axios from 'axios';
import { EventData, ErrorResponse } from '../types'; // Adjust the path if needed
import { API_BASE_URL } from '@/config';
// const API_BASE_URL = 'http://localhost:8000/api'; // Change to your backend URL if different



interface TicketData {
  name: string;
  description: string;
  salesStart?: Date;
  salesEnd?: Date;
  validFrom?: Date;
  validTo?: Date;
  quantity: number;
  maxPerPerson?: number;
  price: number;
  ticketImage?: File;
}

interface AttendeeInfo {
  email: boolean;
  fullName: boolean;
  phoneNumber: boolean;
  hearAboutEvent: boolean;
}

interface PaymentOptions {
  near: boolean;
  stripe: boolean;
}

// Define an interface for the event data
// export interface EventData {
//   _id: string;
//   name: string;
//   description: string;
//   eventDate: Date; // Adjust this to Date
//   address: string;
//   eventImage?: string;
//   tickets: TicketData[];
//   attendeeInfo: AttendeeInfo;
//   paymentOptions: PaymentOptions;
// }

interface EventResponse {
  data: EventData[];
  message?: string;
}

// Utilize the EventData interface for creating events
export const createEvent = async (formData: FormData): Promise<EventResponse | ErrorResponse> => {
  try {
    const response = await axios.post<EventResponse>(`${API_BASE_URL}/events`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error creating event:', error);
    return { message: error.response?.data.message || 'Failed to create event. Please check network and data integrity.' };
  }
};

// Function to get all events with improved error handling
// export const getEvents = async (): Promise<EventData[]> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/events`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data: EventData[] = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     throw new Error('Invalid data format received');
    
//   }
// };

export const getEvents = async (): Promise<EventResponse | ErrorResponse> => {
  try {
    const response = await axios.get<EventResponse>(`${API_BASE_URL}/events`);
    return response.data; // Directly returning the data part of the response
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return {
      message: error.response?.data.message || 'Failed to fetch events. Please check network and data integrity.'
    };
  }
};

// Function to get event details by ID
export const getEventById = async (id: string): Promise<EventData | ErrorResponse> => {
  try {
    const response = await axios.get<EventData>(`${API_BASE_URL}/events/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching event by ID:', error);
    return { message: error.response?.data.message || 'Failed to fetch event. Please check network and data integrity.' };
  }
};