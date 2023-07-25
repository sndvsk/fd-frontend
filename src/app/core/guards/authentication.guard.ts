import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.getUserRole().pipe(
      map((role: string) => {
        if (state.url == '/auth/login') {
          return true;
        }

        const token = localStorage.getItem('accessTokenKey');

        if (!token) {
          return this.router.parseUrl('/auth/login');
        }

        // Role-based access control
        // todo add proper role-based routing
        switch (state.url) {
          case '/rules': {
            if (role === 'CUSTOMER' || role === 'OWNER') {
              this.router.navigate(['/access-denied']);
              return false;
            }

            if (role === 'ADMIN') {
              return true;
            }
            break;
          }

          default:
            this.router.navigate(['/access-denied']);
            return false;
        }

        return true;
      })
    );
  }
}
