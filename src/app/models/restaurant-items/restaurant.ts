import { Address } from '../user-items/address';
import { Menu } from './menu';
import { Order } from './order';

export interface Restaurant {
    restaurant_id?: number;
    name?: string;
    description?: string;
    theme?: string;
    address?: Address;
    phone?: string;
    image?: string;
    ownerId?: number;
    menus?: Menu[];
    orders?: Order[];
}
