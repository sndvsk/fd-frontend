import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationFromCheckout = false;

  setNavigationFromCheckout(value: boolean) {
    this.navigationFromCheckout = value;
  }

  getNavigationFromCheckout(): boolean {
    return this.navigationFromCheckout;
  }
}
