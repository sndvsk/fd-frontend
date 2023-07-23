import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user-items/user';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/user-items/customer';

@Injectable({
  providedIn: 'root',
})
export class UsersClient {
  private baseUrl = environment.apiUrl + '/api/v2/users';

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<any> {
    return this.http.get<Customer>(`${this.baseUrl}/${username}`, { responseType: 'json' });
  }

  updateUser(oldUsername: string, user: User): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update/${oldUsername}`, user, { responseType: 'json' });
  }
}
