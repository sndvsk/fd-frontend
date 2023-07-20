import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RestaurantClient {
    private baseUrl = environment.apiUrl + '/api/v2/restaurants';

    constructor(private http: HttpClient) {}

    getAllRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(`${this.baseUrl}/all`);
    }

    getRestaurantsByOwnerId(ownerId: number): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(`${this.baseUrl}/owner/${ownerId}`);
    }

    getRestaurantsByTheme(theme: string): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(`${this.baseUrl}/theme/${theme}`);
    }

    createRestaurant(ownerId: number, restaurant: Restaurant): Observable<Restaurant> {
        return this.http.post<Restaurant>(`${this.baseUrl}/create/${ownerId}`, restaurant);
    }

    updateRestaurant(restaurantId: number, ownerId: number, restaurant: Restaurant): Observable<Restaurant> {
        return this.http.patch<Restaurant>(`${this.baseUrl}/update/${restaurantId}?ownerId=${ownerId}`, restaurant);
    }

    deleteRestaurant(restaurantId: number, ownerId: number): Observable<string> {
        const params = new HttpParams().set('ownerId', ownerId.toString());
        return this.http.delete(`${this.baseUrl}/delete/${restaurantId}`, { params, responseType: 'text' });
    }
}
