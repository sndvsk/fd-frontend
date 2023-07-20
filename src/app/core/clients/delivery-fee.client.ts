import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryFee } from 'src/app/models/delivery-fee/delivery-fee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryFeeClient {
  private baseUrl = environment.apiUrl + '/api/v1/delivery-fee';

  constructor(private http: HttpClient) {}

  calculateDeliveryFee(city: string, vehicleType: string, dateTime?: string): Observable<DeliveryFee> {
    const params = { city, vehicleType, dateTime };
    return this.http.post<DeliveryFee>(this.baseUrl, params);
  }

  getAllExistingDeliveryFees(): Observable<DeliveryFee[]> {
    return this.http.get<DeliveryFee[]>(this.baseUrl);
  }

  getExistingDeliveryFeeById(id: number): Observable<DeliveryFee> {
    return this.http.get<DeliveryFee>(`${this.baseUrl}/${id}`);
  }
}
