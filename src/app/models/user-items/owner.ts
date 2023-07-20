import { User } from './user';
import { Token } from './token';
import { Restaurant } from '../restaurant-items/restaurant';

export interface Owner extends User {
  restaurants?: Restaurant[];
  tokens: Token[];
}
