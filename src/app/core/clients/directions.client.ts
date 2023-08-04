import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/user-items/address';
import { GoogleDirectionResponse } from 'src/app/models/directions/directions';

@Injectable({
  providedIn: 'root',
})
export class DirectionsClient {
  private baseUrl = environment.apiUrl + '/api/v2/directions';

  constructor(private http: HttpClient) {}

  getDirections(addressDTOs: Address[]): Observable<GoogleDirectionResponse> {
    return this.http.post<GoogleDirectionResponse>(this.baseUrl, addressDTOs);
  }
}
