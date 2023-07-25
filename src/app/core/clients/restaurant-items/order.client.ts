import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/restaurant-items/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderClient {
  private baseUrl = environment.apiUrl + '/api/v2/orders';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/all`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/customer/${customerId}`);
  }

  getOrdersByRestaurant(restaurantId: number, ownerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/${restaurantId}?ownerId=${ownerId}`);
  }

  getOrdersByRestaurantAndCustomer(restaurantId: number, ownerId: number, customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/${restaurantId}/customer/${customerId}?ownerId=${ownerId}`);
  }

  createOrder(customerId: number, restaurantId: number): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/restaurant/${restaurantId}/customer/${customerId}`, null);
  }

  updateOrder(id: number, city: string, vehicleType: string, items: string, customerId: number): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}`, null, {
      params: {
        city,
        vehicleType,
        items,
        customerId: customerId.toString(),
      },
    });
  }

  deleteOrder(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
