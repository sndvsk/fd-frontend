import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          const errorCode = err.error?.errorCode;
          const errorMessage = err.error?.errorMessage;
          const isUnauthorized = !this.authenticationService.isLoggedIn();

          if (isUnauthorized && !request.url.includes('/login')) {
            console.log('User is unauthorized, logging out...');
            this.authenticationService.logout();

            // Stop the error propagation and return an empty observable
            return EMPTY;
          } else if (!isUnauthorized && this.authenticationService.checkAccessToken()) {
            this.authenticationService.setPreviousUrl(window.location.pathname);
            this.authenticationService.refreshToken().subscribe(() => {
              this.router.navigateByUrl(this.authenticationService.getPreviousUrl() || '/');
              this.authenticationService.setPreviousUrl('');
            });
            return EMPTY;
          } else {
            const errorMsg = `Error Code: ${errorCode}, Message: ${errorMessage}`;
            //console.log(errorMsg);
          }
        }

        return throwError(() => err);
      })
    );
  }
}
