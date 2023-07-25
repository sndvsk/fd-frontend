import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';
import { Menu } from 'src/app/models/restaurant-items/menu';

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private cartItemsState = new BehaviorSubject<{ [itemId: number]: number }>({});
  private restaurantIdState = new BehaviorSubject<number | undefined>(undefined);
  private currentRestaurantState = new BehaviorSubject<Restaurant | undefined>(undefined);
  private menusState = new BehaviorSubject<Menu[] | undefined>(undefined);

  cartItems$ = this.cartItemsState.asObservable();
  restaurantId$ = this.restaurantIdState.asObservable();
  currentRestaurant$ = this.currentRestaurantState.asObservable();
  menus$ = this.menusState.asObservable();

  setCheckoutState(cartItems: { [itemId: number]: number }, restaurantId: number, currentRestaurant: Restaurant, menus: Menu[]) {
    this.cartItemsState.next(cartItems);
    this.restaurantIdState.next(restaurantId);
    this.currentRestaurantState.next(currentRestaurant);
    this.menusState.next(menus);
  }

  clearCheckoutState() {
    this.cartItemsState.next({});
    this.restaurantIdState.next(undefined);
    this.currentRestaurantState.next(undefined);
    this.menusState.next(undefined);
  }
}
