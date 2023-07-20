import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate {
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const isLoggedIn = this.authenticationService.isLoggedIn();
    const isLoginPage = state.url === '/auth/login';

    if (isLoggedIn) {
      if (isLoginPage) {
        this.router.navigate(['/']); // Redirect to the home page
        return false;
      }
      return true;
    }

    if (isLoginPage) {
      return true; // Allow access to the login page
    }

    this.router.navigate(['/auth/login']); // Redirect to the login page
    return false;
  }
}
