import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/restaurant-items/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemClient {
  private baseUrl = environment.apiUrl + '/api/v2/items';

  constructor(private http: HttpClient) {}

  getAllItemsForAllRestaurants(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/all`);
  }

  getItemsByOwnerId(ownerId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/owner/${ownerId}`);
  }

  getItemsFromRestaurantMenu(restaurantMenuId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/restaurant/menu/${restaurantMenuId}`);
  }

  getItem(itemId: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${itemId}`);
  }

  addItem(ownerId: number, item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/add/${ownerId}`, item);
  }

  addItemToMenu(menuId: number, ownerId: number, itemId: number): Observable<Item> {
    const params = new HttpParams().set('ownerId', ownerId.toString()).set('itemId', itemId.toString());
    return this.http.post<Item>(`${this.baseUrl}/add/menu/${menuId}`, null, { params: params });
  }

  addItemToRestaurant(restaurantId: number, ownerId: number, itemId: number): Observable<Item> {
    const params = new HttpParams().set('ownerId', ownerId.toString()).set('itemId', itemId.toString());
    return this.http.post<Item>(`${this.baseUrl}/add/restaurant/${restaurantId}`, null, { params: params });
  }

  patchItem(itemId: number, restaurantId: number, ownerId: number, item: Item): Observable<Item> {
    const params = new HttpParams().set('restaurantId', restaurantId.toString()).set('ownerId', ownerId.toString());
    return this.http.patch<Item>(`${this.baseUrl}/patch/${itemId}`, item, { params: params });
  }

  removeItemFromMenu(itemId: number, ownerId: number, restaurantId: number, menuId: number): Observable<Item> {
    const params = new HttpParams()
      .set('itemId', itemId.toString())
      .set('ownerId', ownerId.toString())
      .set('restaurantId', restaurantId.toString());
    return this.http.patch<Item>(`${this.baseUrl}/remove/menu/${menuId}`, null, { params: params });
  }

  removeItemFromRestaurant(itemId: number, ownerId: number, restaurantId: number): Observable<Item> {
    const params = new HttpParams().set('itemId', itemId.toString()).set('ownerId', ownerId.toString());
    return this.http.patch<Item>(`${this.baseUrl}/remove/restaurant/${restaurantId}`, null, { params: params });
  }

  deleteItem(itemId: number, ownerId: number): Observable<string> {
    const params = new HttpParams().set('ownerId', ownerId.toString());
    return this.http.delete<string>(`${this.baseUrl}/${itemId}`, {
      params: params,
      responseType: 'text' as 'json',
    });
  }
}
