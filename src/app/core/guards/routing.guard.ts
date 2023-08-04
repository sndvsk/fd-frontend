import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class RoutingGuard {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.getUserRole().pipe(
      map((role: string) => {
        // Role-based access control
        const url = state.url.split('/')[1];
        switch (url) {
          case 'admin': {
            if (role !== 'ADMIN') {
              this.router.navigate(['/access-denied']);
              return false;
            }
            return true;
          }

          case 'owner': {
            if (role !== 'OWNER' && role !== 'ADMIN') {
              this.router.navigate(['/access-denied']);
              return false;
            }
            return true;
          }

          case 'customer': {
            if (role !== 'CUSTOMER' && role !== 'ADMIN') {
              this.router.navigate(['/access-denied']);
              return false;
            }
            return true;
          }

          case 'user-details': {
            if (!role) {
              this.router.navigate(['/access-denied']);
              return false;
            }
            return true;
          }

          default:
            return true;
        }
      })
    );
  }
}
