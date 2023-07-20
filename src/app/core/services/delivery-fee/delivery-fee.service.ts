import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { DeliveryFee } from 'src/app/models/delivery-fee/delivery-fee';
import { DeliveryFeeClient } from '../../clients/delivery-fee.client';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryFeeService {

  constructor(
    private errorHandler: ErrorHandlerService,
    private deliveryFeeClient: DeliveryFeeClient) {}

  calculateDeliveryFee(city: string, vehicleType: string, dateTime?: string) {
    return this.deliveryFeeClient.calculateDeliveryFee(city, vehicleType, dateTime).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log("All restaurants fetched.");
      })
    );
  }

  getAllExistingDeliveryFees(): Observable<DeliveryFee[]> {
    return this.deliveryFeeClient.getAllExistingDeliveryFees().pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log("All restaurants fetched.");
      })
    );
  }

  getExistingDeliveryFeeById(id: number): Observable<DeliveryFee> {
    return this.deliveryFeeClient.getExistingDeliveryFeeById(id).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log("All restaurants fetched.");
      })
    );
  }
  
}
