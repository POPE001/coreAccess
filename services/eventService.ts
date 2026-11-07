import { supabase } from '@/utils/supabaseClient';
import { EventData, ErrorResponse } from '../types';

interface EventResponse {
  data: EventData[];
  message?: string;
}

export const createEvent = async (formData: FormData): Promise<any | ErrorResponse> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No user, authorization denied');
    }

    const eventName = formData.get('name') as string;
    const description = formData.get('description') as string;
    const address = formData.get('address') as string;
    const eventDate = formData.get('eventDate') as string;
    const eventImage = formData.get('eventImage') as File;

    let imagePath = '';
    if (eventImage && eventImage instanceof File) {
      const fileExt = eventImage.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `event-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('events')
        .upload(filePath, eventImage);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      imagePath = publicUrl;
    }

    const ticketsStr = formData.get('tickets') as string;
    const tickets = ticketsStr ? JSON.parse(ticketsStr) : [];

    const attendeeInfoStr = formData.get('attendeeInfo') as string;
    const paymentOptionsStr = formData.get('paymentOptions') as string;

    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .insert([
        {
          name: eventName,
          description,
          address,
          event_date: eventDate,
          event_image: imagePath,
          user_id: user.id,
          attendee_info: attendeeInfoStr ? JSON.parse(attendeeInfoStr) : {},
          payment_options: paymentOptionsStr ? JSON.parse(paymentOptionsStr) : {},
        }
      ])
      .select()
      .single();

    if (eventError) throw eventError;

    if (tickets && tickets.length > 0) {
      const ticketsToInsert = tickets.map((t: any) => ({
        event_id: eventData.id,
        name: t.name,
        description: t.description,
        price: t.price || 0,
        quantity: t.quantity || 0,
        max_per_person: t.maxPerPerson,
        sales_start: t.salesStart,
        sales_end: t.salesEnd,
        valid_from: t.validFrom,
        valid_to: t.validTo,
        ticket_image: typeof t.ticketImage === 'string' ? t.ticketImage : null
      }));

      const { error: ticketsError } = await supabase
        .from('tickets')
        .insert(ticketsToInsert);

      if (ticketsError) throw ticketsError;
    }

    return { data: eventData, message: 'Event created successfully' };
  } catch (error: any) {
    console.error('Error creating event:', error);
    return { message: error.message || 'Failed to create event.' };
  }
};


export const getEvents = async (): Promise<EventData[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*, tickets(*)');

    if (error) throw error;

    return data.map((item: any) => ({
      ...item,
      _id: item.id,
      eventDate: item.event_date,
      eventImage: item.event_image,
      tickets: item.tickets || [],
      attendeeInfo: item.attendee_info || {},
      paymentOptions: item.payment_options || {},
      createdBy: item.user_id
    })) as EventData[];
  } catch (error: any) {
    console.error('Failed to fetch events:', error.message);
    return [];
  }
};

export const getEventById = async (id: string): Promise<EventData | ErrorResponse> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*, tickets(*)')
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      ...data,
      _id: data.id,
      eventDate: data.event_date,
      eventImage: data.event_image,
      tickets: data.tickets || [],
      attendeeInfo: data.attendee_info || {},
      paymentOptions: data.payment_options || {},
      createdBy: data.user_id
    } as EventData;
  } catch (error: any) {
    console.error('Error fetching event by ID:', error);
    return { message: error.message || 'Failed to fetch event.' };
  }
};