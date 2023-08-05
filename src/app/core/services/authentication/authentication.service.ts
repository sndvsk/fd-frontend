import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { AuthenticationClient } from '../../clients/authentication.client';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  @Output() getLoggedInId: EventEmitter<any> = new EventEmitter();

  // Create a new BehaviorSubject for user role
  private userRole = new BehaviorSubject<string>(localStorage.getItem('user_role') || '');
  private userName = new BehaviorSubject<string>(localStorage.getItem('username') || '');
  private refreshTokenTimeout?: any; // Variable to hold the timeout

  constructor(private errorHandler: ErrorHandlerService, private authenticationClient: AuthenticationClient, private router: Router) {}

  private decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public getRoleFromToken(token: string): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.role : '';
  }

  public getUsernameFromToken(token: string): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.username : '';
  }

  public getUserIdFromToken(token: string): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.sub : '';
  }

  private handleAuthenticationResponse(accessToken: string, refreshToken: string): void {
    // Save tokens from the response
    localStorage.setItem('accessTokenKey', accessToken);
    localStorage.setItem('refreshTokenKey', refreshToken);

    // Get role and username from token
    const userRole = this.getRoleFromToken(accessToken);
    const username = this.getUsernameFromToken(accessToken);

    // Save the user role and username
    localStorage.setItem('user_role', userRole);
    localStorage.setItem('username', username);
    //this.username = username;

    // Update the user role
    this.userRole.next(userRole);
    this.router.navigate(['/']);

    // Set refresh token timer
    //this.startRefreshTokenTimer();
  }

  public login(username: string, password: string) {
    return this.authenticationClient.login(username, password).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        this.handleAuthenticationResponse(response.access_token, response.refresh_token);
        localStorage.setItem('username', username);
        localStorage.setItem('user_id', this.getUserIdFromToken(response.access_token));
        const id = localStorage.getItem('user_id');
        this.getLoggedInName.emit(username);
        this.getLoggedInId.emit(id);
        console.log('Logged in.');
      })
    );
  }

  public register(firstname: string, lastname: string, username: string, email: string, password: string, telephone: string, role: string) {
    return this.authenticationClient.register(firstname, lastname, username, email, password, telephone, role).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        this.handleAuthenticationResponse(response.access_token, response.refresh_token);
        localStorage.setItem('username', username);
        localStorage.setItem('user_id', this.getUserIdFromToken(response.access_token));
        const id = localStorage.getItem('user_id');
        this.getLoggedInName.emit(username);
        this.getLoggedInId.emit(id);
        console.log('Registered.');
      })
    );
  }

  public logout() {
    const token = this.getToken();
    if (token) {
      this.authenticationClient
        .logout(token)
        .pipe(
          catchError(this.errorHandler.handleError),
          tap(() => {
            console.log('Logged out.');
          })
        )
        .subscribe();
    }

    localStorage.clear();
    /*     localStorage.removeItem('accessTokenKey');
    localStorage.removeItem('refreshTokenKey');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('admin_view_owner_id');
    localStorage.removeItem('cart');
    localStorage.removeItem('restaurantId'); */
    this.router.navigate(['/auth/login']);

    this.stopRefreshTokenTimer();
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('accessTokenKey');
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem('accessTokenKey') : null;
  }

  public getUserRole(): Observable<string> {
    return this.userRole.asObservable();
  }

  public getUsername(): Observable<string> {
    return this.userName.asObservable();
  }

  public getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  public setUserId(userId: string): void {
    localStorage.setItem('user_id', userId);
  }

  public checkAccessToken(): boolean {
    const accessToken = localStorage.getItem('accessTokenKey');
    if (accessToken !== null) {
      const tokenExpiration = this.decodeToken(accessToken).exp;
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime > tokenExpiration;
    }
    return false;
  }

  public setPreviousUrl(url: string) {
    localStorage.setItem('previousUrl', url);
  }

  public getPreviousUrl() {
    return localStorage.getItem('previousUrl');
  }

  public refreshToken() {
    const refreshToken = localStorage.getItem('refreshTokenKey');
    if (refreshToken == null) {
      return throwError(() => 'Refresh token not found');
    }
    console.log('Refreshing token.');
    return this.authenticationClient.refreshToken(refreshToken).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        // Save the refreshed tokens here
        localStorage.setItem('accessTokenKey', response.access_token);
        localStorage.setItem('refreshTokenKey', response.refresh_token);

        location.reload();

        // Restart the refresh token timer
        //this.startRefreshTokenTimer();
      })
    );
  }

  private startRefreshTokenTimer() {
    // Clear existing refresh token timeout
    this.stopRefreshTokenTimer();

    // Get the expiration time of the access token
    const accessToken = localStorage.getItem('accessTokenKey');
    if (!accessToken) {
      return;
    }
    const tokenExpiration = this.decodeToken(accessToken).exp;

    // Calculate the timeout duration (1 minute before the token expiration)
    const expiresIn = tokenExpiration - Math.floor(Date.now() / 1000) - 60;

    // Set the timeout to refresh the token
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), expiresIn * 1000);
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = undefined;
    }
  }
}
