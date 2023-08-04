import { Injectable } from '@angular/core';
import { OwnerClient } from '../../clients/user-items/owner.client';
import { catchError, tap } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  constructor(private client: OwnerClient, private errorHandler: ErrorHandlerService) {}

  getOwner(userId: number) {
    return this.client.getOwner(userId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }

  rejectOrder(orderId: number, ownerId: number) {
    return this.client.rejectOrder(orderId, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }

  approveOrder(orderId: number, ownerId: number) {
    return this.client.approveOrder(orderId, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }
}
