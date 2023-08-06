import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';
import { Menu } from 'src/app/models/restaurant-items/menu';

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private cartItemsState = new BehaviorSubject<{ [itemId: number]: number }>(this.loadState('cartItems') || {});
  private restaurantIdState = new BehaviorSubject<number | undefined>(this.loadState('restaurantId'));
  private currentRestaurantState = new BehaviorSubject<Restaurant | undefined>(this.loadState('currentRestaurant'));
  private menusState = new BehaviorSubject<Menu[] | undefined>(this.loadState('menus'));

  cartLenght = 0;

  cartItems$ = this.cartItemsState.asObservable();
  restaurantId$ = this.restaurantIdState.asObservable();
  currentRestaurant$ = this.currentRestaurantState.asObservable();
  menus$ = this.menusState.asObservable();

  setCheckoutState(cartItems: { [itemId: number]: number }, restaurantId: number, currentRestaurant: Restaurant, menus: Menu[]) {
    const restaurantIdAsNumber = Number(restaurantId);
    this.saveState('cartItems', cartItems);
    this.saveState('restaurantId', restaurantIdAsNumber);
    this.saveState('currentRestaurant', currentRestaurant);
    this.saveState('menus', menus);

    this.cartItemsState.next(cartItems);
    this.restaurantIdState.next(restaurantId);
    this.currentRestaurantState.next(currentRestaurant);
    this.menusState.next(menus);
  }

  clearCheckoutState() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('currentRestaurant');
    localStorage.removeItem('menus');

    this.cartItemsState.next({});
    this.currentRestaurantState.next(undefined);
    this.menusState.next(undefined);
  }

  clearRestaurantIdState() {
    localStorage.removeItem('restaurantId');
    this.restaurantIdState.next(undefined);
  }

  addToItem(itemId: number, restaurantId: number): void {
    this.loadCart();
    const currentRestaurantInCart = localStorage.getItem('restaurantId');

    if (currentRestaurantInCart && currentRestaurantInCart !== restaurantId.toString()) {
      alert('You can only order from one restaurant at a time. Please clear your cart before adding items from a different restaurant.');
    } else {
      localStorage.setItem('restaurantId', restaurantId.toString());

      const currentCart = { ...this.cartItemsState.value };
      if (currentCart[itemId]) {
        currentCart[itemId]++;
      } else {
        currentCart[itemId] = 1;
      }

      this.cartItemsState.next(currentCart);
      this.saveState('cartItems', currentCart);
      this.saveCart();
    }
  }

  removeItem(itemId: number): void {
    this.loadCart();
    const currentCart = { ...this.cartItemsState.value };

    if (currentCart[itemId] && currentCart[itemId] > 1) {
      currentCart[itemId]--;
    } else {
      delete currentCart[itemId];
    }

    this.cartItemsState.next(currentCart);
    this.saveState('cartItems', currentCart);
    this.saveCart();

    const cartLength = Object.values(currentCart).reduce((a, b) => a + b, 0);
    if (cartLength === 0) {
      localStorage.removeItem('restaurantId');
    }
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsState.value));
  }

  loadCart(): void {
    const cart = localStorage.getItem('cart');
    const loadedCart = cart ? JSON.parse(cart) : {};
    this.cartItemsState.next(loadedCart);

    const cartLength = (Object.values(loadedCart) as number[]).reduce((a: number, b: number) => a + b, 0);
    if (cartLength === 0) {
      localStorage.removeItem('restaurantId');
    }
  }

  private saveState(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  private loadState(key: string): any {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  }
}
