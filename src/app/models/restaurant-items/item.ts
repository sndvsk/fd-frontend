import { Order } from './order';

export interface Item {
	id?: number;
	name?: string;
	description?: string;
	price?: number;
	image?: string;
	ingredients?: string[];
	allergens?: string[];
}
