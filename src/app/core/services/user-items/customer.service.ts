import { ErrorHandler, Injectable } from '@angular/core';
import { Address } from 'src/app/models/user-items/address';
import { CustomerClient } from '../../clients/user-items/customer.client';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
	providedIn: 'root',
})
export class CustomerService {
	constructor(
		private errorHandler: ErrorHandlerService,
		private client: CustomerClient
	) {}

	getAddress(userId: number) {
		return this.client.getAddress(userId).pipe(
			catchError(this.errorHandler.handleError),
			tap((response) => {
				console.log(response);
			})
		);
	}

	addAddress(userId: number, address: Address) {
		return this.client.addAddress(userId, address).pipe(
			catchError(this.errorHandler.handleError),
			tap((response) => {
				console.log(response);
			})
		);
	}

	updateAddress(userId: number, address: Address) {
		return this.client.updateAddress(userId, address).pipe(
			catchError(this.errorHandler.handleError),
			tap((response) => {
				console.log(response);
			})
		);
	}
}
