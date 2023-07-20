import { Item } from './item';

export interface Order {
  id?: number;
  customerId?: number;
  restaurantId?: number;
  orderDate?: Date;
  totalPrice?: number;
  status?: string;
  items?: Item[];
}
