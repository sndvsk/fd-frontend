import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Address } from 'src/app/models/user-items/address';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CustomerClient {
	private baseUrl = environment.apiUrl + '/api/v2/customers';

	constructor(private http: HttpClient) {}

	getAddress(userId: number): Observable<any> {
		return this.http.get(`${this.baseUrl}/${userId}/address`, {
			responseType: 'json',
		});
	}

	addAddress(userId: number, address: Address): Observable<any> {
		return this.http.post(`${this.baseUrl}/${userId}/address`, address, {
			responseType: 'json',
		});
	}

	updateAddress(userId: number, address: Address): Observable<any> {
		return this.http.patch(`${this.baseUrl}/${userId}/address`, address, {
			responseType: 'json',
		});
	}
}
