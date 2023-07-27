import { Injectable } from '@angular/core';
import { AdminClient } from '../../clients/user-items/admin.client';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private errorHandler: ErrorHandlerService, private client: AdminClient) {}

  approveOwner(ownerId: number) {
    return this.client.approveOwner(ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }

  rejectOwner(ownerId: number) {
    return this.client.rejectOwner(ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }

  getOwnersWithApprovalStatusFalse() {
    return this.client.getOwnersWithApprovalStatusFalse().pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }

  getOwners() {
    return this.client.getOwners().pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }
}
