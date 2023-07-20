import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/restaurant-items/item';
import { ItemClient } from '../../clients/restaurant-items/item.client';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ItemService {
	constructor(
		private errorHandler: ErrorHandlerService,
		private itemClient: ItemClient
	) {}

	getAllItemsForAllRestaurants() {
		return this.itemClient
			.getAllItemsForAllRestaurants()
			.pipe(catchError(this.errorHandler.handleError));
	}

	getItemsFromRestaurantMenu(restaurantMenuId: number) {
		return this.itemClient
			.getItemsFromRestaurantMenu(restaurantMenuId)
			.pipe(catchError(this.errorHandler.handleError));
	}

	getItem(itemId: number) {
		return this.itemClient
			.getItem(itemId)
			.pipe(catchError(this.errorHandler.handleError));
	}

	addItemToRestaurantMenu(restaurantId: number, ownerId: number, item: Item) {
		return this.itemClient
			.addItem(restaurantId, ownerId, item)
			.pipe(catchError(this.errorHandler.handleError));
	}

	patchItemInRestaurantMenu(
		itemId: number,
		restaurantId: number,
		ownerId: number,
		item: Item
	) {
		return this.itemClient
			.patchItem(itemId, restaurantId, ownerId, item)
			.pipe(catchError(this.errorHandler.handleError));
	}

	deleteItemFromRestaurantMenu(itemId: number, ownerId: number) {
		return this.itemClient
			.deleteItem(itemId, ownerId)
			.pipe(catchError(this.errorHandler.handleError));
	}
}
