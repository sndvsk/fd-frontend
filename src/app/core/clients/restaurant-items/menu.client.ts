import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/restaurant-items/item';
import { Menu } from 'src/app/models/restaurant-items/menu';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuClient {
  private baseUrl = environment.apiUrl + '/api/v2/menus';

  constructor(private http: HttpClient) {}

  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.baseUrl}/all`);
  }

  getMenusByOwnerId(ownerId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.baseUrl}/owner/${ownerId}`);
  }

  getMenusOfRestaurant(restaurantId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.baseUrl}/restaurant/${restaurantId}`);
  }

  getMenu(menuId: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.baseUrl}/${menuId}`);
  }

  addMenu(ownerId: number, menuName: string): Observable<Menu> {
    return this.http.post<Menu>(`${this.baseUrl}/${ownerId}`, null, {
      params: { menuName },
    });
  }

  addItemToMenu(menuId: number, restaurantId: number, itemId: number, ownerId: number): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/restaurant/${restaurantId}/${menuId}`, null, {
      params: { itemId: String(itemId), ownerId: String(ownerId) },
    });
  }

  addMenuToRestaurant(restaurantId: number, menuId: number, ownerId: number): Observable<Menu> {
    return this.http.post<Menu>(`${this.baseUrl}/restaurant/${restaurantId}`, null, {
      params: { menuId: String(menuId), ownerId: String(ownerId) },
    });
  }

  toggleMenuVisibility(menuId: number, ownerId: number): Observable<Menu> {
    return this.http.patch<Menu>(`${this.baseUrl}/visibility/${menuId}`, null, {
      params: { ownerId: String(ownerId) },
    });
  }

  patchMenu(menuId: number, menuName: string, ownerId: number): Observable<Menu> {
    return this.http.patch<Menu>(`${this.baseUrl}/${menuId}`, null, {
      params: { menuName, ownerId: String(ownerId) },
    });
  }

  removeMenuFromRestaurant(menuId: number, ownerId: number, restaurantId: number): Observable<Menu> {
    return this.http.patch<Menu>(`${this.baseUrl}/restaurant/${restaurantId}/menu/${menuId}`, null, {
      params: { ownerId: String(ownerId) },
    });
  }

  deleteMenu(menuId: number, ownerId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${menuId}`, {
      params: { ownerId: String(ownerId) },
      responseType: 'text',
    });
  }
}
