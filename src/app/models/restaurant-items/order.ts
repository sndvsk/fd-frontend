import { Item } from './item';

interface customerItems {
  firstname: string;
  lastname: string;
  username: string;
}

export interface Order {
  order_id?: number;
  customer_id?: number;
  customer: customerItems;
  restaurant_id?: number;
  datetime?: Date | string;
  item_price?: number;
  delivery_fee?: number;
  total_price?: number;
  status?: string;
  items?: Item[];
}
