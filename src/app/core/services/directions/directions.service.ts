import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { DirectionsClient } from '../../clients/directions.client';
import { Address } from 'src/app/models/user-items/address';

@Injectable({
  providedIn: 'root',
})
export class DirectionsService {
  constructor(private client: DirectionsClient, private errorHandler: ErrorHandlerService) {}

  getDirections(addressDTOs: Address[]) {
    return this.client.getDirections(addressDTOs).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }
}
