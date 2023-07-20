import { User } from './user';
import { Address } from './address';
import { Token } from './token';
import { Order } from '../restaurant-items/order';

export interface Customer extends User {
  orders?: Order[];
  addresses?: Address[];
  tokens?: Token[];
}
