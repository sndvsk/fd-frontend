import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/restaurant-items/item';
import { ItemClient } from '../../clients/restaurant-items/item.client';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private errorHandler: ErrorHandlerService, private itemClient: ItemClient) {}

  getAllItemsForAllRestaurants() {
    return this.itemClient.getAllItemsForAllRestaurants().pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`All items for all restaurants were fetched.`);
      })
    );
  }

  getItemsByOwnerId(ownerId: number) {
    return this.itemClient.getItemsByOwnerId(ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`All items for owner: ${ownerId} were fetched.`);
      })
    );
  }

  getItemsFromRestaurantMenu(restaurantMenuId: number) {
    return this.itemClient.getItemsFromRestaurantMenu(restaurantMenuId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`All items for restaurant menu: ${restaurantMenuId} were fetched.`);
      })
    );
  }

  getItem(itemId: number) {
    return this.itemClient.getItem(itemId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Item: ${itemId} was fetched.`);
      })
    );
  }

  addItem(ownerId: number, item: Item) {
    return this.itemClient.addItem(ownerId, item).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Item was added by owner: ${ownerId}.`);
      })
    );
  }

  addItemToMenu(menuId: number, ownerId: number, itemId: number) {
    return this.itemClient.addItemToMenu(menuId, ownerId, itemId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Item: ${itemId} was added to menu: ${menuId} by owner: ${ownerId}.`);
      })
    );
  }

  addItemToRestaurant(restaurantId: number, ownerId: number, itemId: number) {
    return this.itemClient.addItemToRestaurant(restaurantId, ownerId, itemId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Item: ${itemId} was added to restaurant: ${restaurantId} by owner: ${ownerId}.`);
      })
    );
  }

  patchItemInRestaurantMenu(itemId: number, restaurantId: number, ownerId: number, item: Item) {
    return this.itemClient.patchItem(itemId, restaurantId, ownerId, item).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Item: ${itemId} was updated in restaurant: ${restaurantId}.`);
      })
    );
  }

  removeItemFromMenu(itemId: number, ownerId: number, restaurantId: number, menuId: number) {
    return this.itemClient.removeItemFromMenu(itemId, ownerId, restaurantId, menuId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Item: ${itemId} was removed from menu: ${menuId}.`);
      })
    );
  }

  removeItemFromRestaurant(itemId: number, ownerId: number, restaurantId: number) {
    return this.itemClient.removeItemFromRestaurant(itemId, ownerId, restaurantId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Item: ${itemId} was removed from restaurant: ${restaurantId}.`);
      })
    );
  }

  deleteItem(itemId: number, ownerId: number) {
    return this.itemClient.deleteItem(itemId, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Item: ${itemId} was deleted from restaurant menu.`);
      })
    );
  }
}
