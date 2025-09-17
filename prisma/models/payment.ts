import { User } from './user';
import { Ride } from './ride';

export type PaymentStatus = 'pending' | 'completed' | 'failed';
export type PaymentMethod = 'credit_card' | 'cash' | 'wallet';

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  rideId: string;
  ride: Ride;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}