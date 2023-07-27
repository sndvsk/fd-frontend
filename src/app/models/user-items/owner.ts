import { User } from './user';
import { Restaurant } from '../restaurant-items/restaurant';

export interface Owner extends User {
  owner_id?: number;
  restaurants?: Restaurant[];
  approved: boolean;
  user: User;
}
