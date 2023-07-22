export interface Item {
  item_id?: number;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  ingredients?: string[];
  allergens?: string[];
  menu_id?: number;
  restaurant_id?: number;
}
