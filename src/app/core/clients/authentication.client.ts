import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public baseUrl = environment.apiUrl + '/api/v2/auth';

  public login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      {
        username: username,
        password: password,
      },
      { responseType: 'json' }
    );
  }

  public register(
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    telephone: string,
    role: string
  ): Observable<any> {
    return this.http.post(
      this.baseUrl + '/register',
      {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        telephone: telephone,
        role: role,
      },
      { responseType: 'json' }
    );
  }

  public logout(token: string): Observable<any> {
    const headers = { Authorization: 'Bearer ' + token };
    return this.http.post(`${this.baseUrl}/logout`, null, { headers: headers });
  }

  public refreshToken(refreshToken: string): Observable<any> {
    const headers = { Authorization: 'Bearer ' + refreshToken };
    return this.http.post(`${this.baseUrl}/refresh-token`, {}, { headers: headers });
  }
}
