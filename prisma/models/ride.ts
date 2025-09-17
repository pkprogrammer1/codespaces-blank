import { User } from './user';
import { Payment } from './payment';

export interface Ride {
  id: string;
  from: string;
  to: string;
  price: number;
  userId: string;
  user: User;
  payment?: Payment | null;
  createdAt: Date;
  updatedAt: Date;
}