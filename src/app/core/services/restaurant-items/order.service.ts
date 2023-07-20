import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Order } from 'src/app/models/restaurant-items/order';
import { OrderClient } from '../../clients/restaurant-items/order.client';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(
		private errorHandler: ErrorHandlerService,
		private orderClient: OrderClient
	) {}

	getAllOrders() {
		return this.orderClient.getAllOrders().pipe(
			catchError(this.errorHandler.handleError),
			tap((response) => {
				console.log('All restaurants fetched.');
			})
		);
	}

	getOrderById(id: number): Observable<Order> {
		return this.orderClient.getOrderById(id).pipe(
			catchError(this.errorHandler.handleError),
			tap((response) => {
				console.log('All restaurants fetched.');
			})
		);
	}

	getOrdersByCustomer(customerId: number) {
		return this.orderClient.getOrdersByCustomer(customerId).pipe(
			catchError(this.errorHandler.handleError),
			tap((response) => {
				console.log('All restaurants fetched.');
			})
		);
	}

	getOrdersByRestaurant(restaurantId: number, ownerId: number) {
		return this.orderClient
			.getOrdersByRestaurant(restaurantId, ownerId)
			.pipe(
				catchError(this.errorHandler.handleError),
				tap((response) => {
					console.log('All restaurants fetched.');
				})
			);
	}

	getOrdersByRestaurantAndCustomer(
		restaurantId: number,
		ownerId: number,
		customerId: number
	) {
		return this.orderClient
			.getOrdersByRestaurantAndCustomer(restaurantId, ownerId, customerId)
			.pipe(
				catchError(this.errorHandler.handleError),
				tap((response) => {
					console.log('All restaurants fetched.');
				})
			);
	}

	createOrder(customerId: number, restaurantId: number) {
		return this.orderClient.createOrder(customerId, restaurantId).pipe(
			catchError(this.errorHandler.handleError),
			tap((response) => {
				console.log('All restaurants fetched.');
			})
		);
	}

	updateOrder(
		id: number,
		city: string,
		vehicleType: string,
		items: string,
		customerId: number
	) {
		return this.orderClient
			.updateOrder(id, city, vehicleType, items, customerId)
			.pipe(
				catchError(this.errorHandler.handleError),
				tap((response) => {
					console.log('All restaurants fetched.');
				})
			);
	}

	deleteOrder(id: number) {
		return this.orderClient.deleteOrder(id).pipe(
			catchError(this.errorHandler.handleError),
			tap((response) => {
				console.log('All restaurants fetched.');
			})
		);
	}
}
