import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { UsersClient } from '../../clients/user-items/users.client';
import { User } from 'src/app/models/user-items/user';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private errorHandler: ErrorHandlerService, private client: UsersClient, private router: Router) {}

  getAllUsers() {
    return this.client.getAllUsers().pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }

  getUserById(userId: number) {
    return this.client.getUserById(userId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }

  getUser(username: string) {
    return this.client.getUser(username).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }

  updateUser(username: string, user: User) {
    return this.client.updateUser(username, user).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }
}
