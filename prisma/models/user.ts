import { Payment } from './payment';
import { Ride } from './ride';

export interface User {
  id: string;
  email: string;
  name?: string | null;
  phone?: string | null;
  address?: string | null;
  rides: Ride[];
  payments: Payment[];
  createdAt: Date;
  updatedAt: Date;
}