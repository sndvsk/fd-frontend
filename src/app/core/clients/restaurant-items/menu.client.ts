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

    getMenu(menuId: number): Observable<Menu> {
        return this.http.get<Menu>(`${this.baseUrl}/${menuId}`);
    }

    getMenusOfRestaurant(restaurantId: number): Observable<Menu[]> {
        return this.http.get<Menu[]>(`${this.baseUrl}/restaurant/${restaurantId}`);
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

    makeMenuVisible(menuId: number, ownerId: number): Observable<Menu> {
        return this.http.patch<Menu>(`${this.baseUrl}/${menuId}`, null, {
            params: { ownerId: String(ownerId) },
        });
    }

    patchMenuInRestaurant(menuId: number, menuName: string, restaurantId: number, ownerId: number): Observable<Menu> {
        return this.http.patch<Menu>(`${this.baseUrl}/restaurant/${restaurantId}/${menuId}`, null, {
            params: { menuName, ownerId: String(ownerId) },
        });
    }

    deleteMenuFromRestaurant(menuId: number, restaurantId: number, ownerId: number): Observable<string> {
        return this.http.delete(`${this.baseUrl}/restaurant/${restaurantId}/menu/${menuId}`, {
            params: { ownerId: String(ownerId) },
            responseType: 'text',
        });
    }

    deleteMenu(menuId: number, ownerId: number): Observable<string> {
        return this.http.delete(`${this.baseUrl}/${menuId}`, {
            params: { ownerId: String(ownerId) },
            responseType: 'text',
        });
    }
}
