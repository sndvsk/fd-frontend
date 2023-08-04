import { Item } from './item';

export interface Menu {
  menu_id?: number;
  name?: string;
  restaurant_id?: number | null;
  restaurant_name?: string | null;
  items?: Item[];
  visibility?: string;
}
