import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Owner } from 'src/app/models/user-items/owner';

@Injectable({
  providedIn: 'root',
})
export class AdminClient {
  private baseUrl = environment.apiUrl + '/api/v2/admins';

  constructor(private http: HttpClient) {}

  approveOwner(ownerId: number) {
    return this.http.post(`${this.baseUrl}/approve-owner/${ownerId}`, {
      responseType: 'text',
    });
  }

  rejectOwner(ownerId: number) {
    return this.http.post(`${this.baseUrl}/reject-owner/${ownerId}`, {
      responseType: 'text',
    });
  }

  getOwnersWithApprovalStatusFalse(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${this.baseUrl}/owners/approved-false`);
  }

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${this.baseUrl}/owners`);
  }
}
