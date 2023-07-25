import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminClient {
  private baseUrl = environment.apiUrl + '/api/v2/admins';

  constructor(private http: HttpClient) {}

  /*   updateAdmin(oldUsername: string, user: User): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/update/${oldUsername}`,
      user,
      { responseType: 'json' });
  } */
}