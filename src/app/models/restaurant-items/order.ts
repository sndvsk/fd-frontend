import { Item } from './item';

export interface Order {
  order_id?: number;
  customer_id?: number;
  restaurant_id?: number;
  datetime?: Date | string;
  item_price?: number;
  delivery_fee?: number;
  total_price?: number;
  status?: string;
  items?: Item[];
}
