import { Item } from './item';

export interface Menu {
  menu_id?: number;
  name?: string;
  restaurant_id?: number;
  items?: Item[];
  visibility?: string;
}
