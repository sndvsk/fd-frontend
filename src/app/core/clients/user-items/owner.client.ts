import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Owner } from 'src/app/models/user-items/owner';
import { Order } from 'src/app/models/restaurant-items/order';

@Injectable({
  providedIn: 'root',
})
export class OwnerClient {
  private baseUrl = environment.apiUrl + '/api/v2/owners';

  constructor(private http: HttpClient) {}

  getOwner(userId: number): Observable<Owner> {
    return this.http.get<Owner>(`${this.baseUrl}/${userId}`);
  }

  approveOrder(orderId: number, ownerId: number) {
    return this.http.patch<Order>(`${this.baseUrl}/accept-order/${orderId}?ownerId=${ownerId}`, {
      responseType: 'json',
    });
  }

  rejectOrder(orderId: number, ownerId: number) {
    return this.http.patch<Order>(`${this.baseUrl}/reject-order/${orderId}?ownerId=${ownerId}`, {
      responseType: 'json',
    });
  }
}
