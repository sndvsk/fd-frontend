import { Item } from './item';

export interface Menu {
  id?: number;
  name?: string;
  restaurantId?: number;
  items?: Item[];  
}
