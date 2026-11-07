// types/keypom.ts

import { Account } from 'near-api-js';

export interface INearConfig {
  networkId: string;
  keyStore: any;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
  explorerUrl: string;
}

export interface ITrialAccountParams {
  account: Account;
  numKeys: number;
  contractBytes: number[]; // Required by SDK
  startingBalanceNEAR: string;
  callableContracts: string[];
  callableMethods: string[][];
  maxAttachableNEARPerContract: string[];
  trialEndFloorNEAR: string;
}

// export interface Ticket {
//   name: string;
//   description: string;
//   salesStart?: Date;
//   salesEnd?: Date;
//   validFrom?: Date;
//   validTo?: Date;
//   quantity: number;
//   maxPerPerson?: number;
//   price: number;
//   ticketImage?: File;  // Change here: File | undefined
//   event?: string; // Ensure this field is included
// }

// export interface EventDetails {
//   address: string;
//   name: string;
//   description: string;
//   eventDate: string;
//   // eventImage?: File; // Ensure eventImage is of type File
// }

// export interface EventData {
//   _id?: string;
//   name: string;
//   description: string;
//   address: string;
//   eventDate: string;
//   eventImage?: string;
//   eventDetails: EventDetails;
//   attendeeInfo: AttendeeInfo;  // Assuming you have defined this elsewhere
//   paymentOptions: PaymentOptions;
//   tickets: Ticket[];  
// }



// export interface AttendeeInfo {
//   emailAddress: boolean;
//   fullName: boolean;
//   phoneNumber: boolean;
//   heardAboutEvent: boolean;
// }

// export interface PaymentOptions {
//   near: boolean;
//   stripe: boolean;
//   paymentMethods: string[];
// }

// export interface EventData {
//   eventDetails: EventDetails;
//   attendeeInfo: AttendeeInfo;
//   tickets: Ticket[];
//   paymentOptions: PaymentOptions;
// }

// export interface EventData {
//   _id: string;
//   name: string;
//   description: string;
//   address: string;
//   eventDate: string;
//   eventImage: string | null; // Assuming eventImage can be null
//   eventDetails: EventDetails;
//   attendeeInfo: AttendeeInfo;
//   paymentOptions: PaymentOptions;
//   tickets: Ticket[];
//   __v: number;
// }


// export interface EventData {
//   _id: string;
//   name: string;
//   description: string;
//   eventDate: Date;
//   address: string;
//   eventImage?: string;
//   tickets: TicketData[];
//   attendeeInfo: AttendeeInfo;
//   paymentOptions: PaymentOptions;
// }


export interface AttendeeInfo {
  fullName: boolean;
  phoneNumber: boolean;
  emailAddress: boolean;
  heardAboutEvent: boolean;
}


export interface PaymentOptions {
  near: boolean;
  stripe: boolean;
  paymentMethods: string[];
}

export interface Ticket {
  // _id: Key | null | undefined;
  _id: string;
  name: string;
  description: string;
  salesStart?: Date;
  salesEnd?: Date;
  validFrom?: Date;
  validTo?: Date;
  quantity: number;
  maxPerPerson?: number;
  price: number;
  ticketImage?: File | string; // Adjusted to handle both File and string
  event?: string; // Ensure this field is included
}

export interface EventDetails {
  address: string;
  name: string;
  description: string;
  eventDate: string;
}

export interface EventData {
  _id?: string;
  name: string;
  description: string;
  address: string;
  eventDate: string;
  createdBy: string;
  eventImage?: File | string; // Adjusted to handle both File and string
  eventDetails: EventDetails;
  attendeeInfo: AttendeeInfo;
  paymentOptions: PaymentOptions;
  tickets: Ticket[];
}



export interface ErrorResponse {
  message: string;
}
