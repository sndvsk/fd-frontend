import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NavigationService } from '../services/navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutNavigationGuard {
  constructor(private navigationService: NavigationService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const navigationFromCheckout = this.navigationService.getNavigationFromCheckout();

    if (navigationFromCheckout) {
      this.navigationService.setNavigationFromCheckout(false);
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
