import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';
import { RestaurantClient } from '../../clients/restaurant-items/restaurant.client';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private errorHandler: ErrorHandlerService, private restaurantClient: RestaurantClient) {}

  getAllRestaurants() {
    return this.restaurantClient.getAllRestaurants().pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log('All restaurants fetched.');
      })
    );
  }

  getRestaurantsByOwnerId(ownerId: number) {
    return this.restaurantClient.getRestaurantsByOwnerId(ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Restaurants by owner: ${ownerId} fetched.`);
      })
    );
  }

  getRestaurantsByTheme(theme: string) {
    return this.restaurantClient.getRestaurantsByTheme(theme).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Restaurants by theme: ${theme} fetched.`);
      })
    );
  }

  getRestaurant(restaurantId: number) {
    return this.restaurantClient.getRestaurant(restaurantId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Restaurant: ${restaurantId} fetched.`);
      })
    );
  }

  createRestaurant(ownerId: number, restaurant: Restaurant) {
    return this.restaurantClient.createRestaurant(ownerId, restaurant).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log('Restaurant created.');
      })
    );
  }

  updateRestaurant(restaurantId: number, ownerId: number, restaurant: Restaurant) {
    return this.restaurantClient.updateRestaurant(restaurantId, ownerId, restaurant).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Restaurant: ${restaurantId} updated.`);
      })
    );
  }

  deleteRestaurant(restaurantId: number, ownerId: number) {
    return this.restaurantClient.deleteRestaurant(restaurantId, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }
}
