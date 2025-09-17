import { User } from './user';
import { Ride } from './ride';

export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  userId: string;
  user: User;
  ridesFrom: Ride[];
  ridesTo: Ride[];
  createdAt: Date;
  updatedAt: Date;
}