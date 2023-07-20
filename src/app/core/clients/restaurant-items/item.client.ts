import { HttpClient, HttpHeaders } from '@angular/common/http';
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

	getItemsFromRestaurantMenu(restaurantMenuId: number): Observable<Item[]> {
		return this.http.get<Item[]>(
			`${this.baseUrl}/restaurant/menu/${restaurantMenuId}`
		);
	}

	getItem(itemId: number): Observable<Item> {
		return this.http.get<Item>(`${this.baseUrl}/${itemId}`);
	}

	addItem(
		restaurantId: number,
		ownerId: number,
		item: Item
	): Observable<Item> {
		const headers = new HttpHeaders().set('ownerId', ownerId.toString());
		return this.http.post<Item>(
			`${this.baseUrl}/add/restaurant/${restaurantId}`,
			item,
			{ headers: headers }
		);
	}

	patchItem(
		itemId: number,
		restaurantId: number,
		ownerId: number,
		item: Item
	): Observable<Item> {
		const headers = new HttpHeaders().set('ownerId', ownerId.toString());
		return this.http.patch<Item>(
			`${this.baseUrl}/patch/restaurant/${restaurantId}/${itemId}`,
			item,
			{ headers: headers }
		);
	}

	deleteItem(itemId: number, ownerId: number): Observable<string> {
		const headers = new HttpHeaders().set('ownerId', ownerId.toString());
		return this.http.delete<string>(`${this.baseUrl}/${itemId}`, {
			headers: headers,
		});
	}
}
