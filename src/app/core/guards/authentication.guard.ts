import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authenticationService.isLoggedIn();
    const isLoginPage = state.url === '/auth/login';
    const isRegisterPage = state.url === '/auth/register';
    const isLogoutPage = state.url === '/auth/logout';

    if (isLoggedIn) {
      if (isLoginPage || isRegisterPage) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      if (isLogoutPage) {
        this.router.navigate(['/']);
        return false;
      }
    }

    if (isLoginPage || isRegisterPage) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
