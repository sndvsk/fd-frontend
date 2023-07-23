import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';
import { DeliveryFeeService } from 'src/app/core/services/delivery-fee/delivery-fee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Menu } from 'src/app/models/restaurant-items/menu';
import { ItemService } from 'src/app/core/services/restaurant-items/item.service';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';

interface State {
  cartItems: { [itemId: number]: number };
  restaurantId: number;
  currentRestaurant: Restaurant;
  menus: Menu[];
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: { [itemId: number]: number } = {};
  cartLenght = 0;
  restaurantId?: number;
  currentRestaurant?: Restaurant;
  menus: Menu[] = [];
  deliveryFees: { [vehicleType: string]: number | string } = {
    car: '',
    bike: '',
    scooter: '',
  };
  selectedVehicleType: string | undefined;

  constructor(
    private location: Location,
    private deliveryFeeService: DeliveryFeeService,
    private restaurantService: RestaurantService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    const state = this.location.getState() as State;
    this.loadCart();

    if (state.cartItems && state.restaurantId && state.currentRestaurant && state.menus) {
      this.cartItems = state.cartItems;
      this.restaurantId = state.restaurantId;
      this.currentRestaurant = state.currentRestaurant;
      this.menus = state.menus;

      // Call getDeliveryFees() if state is defined
      this.getDeliveryFees();
    } else {
      // Fetch the item details using the ID of the first item in the cart
      const firstItemId = Object.keys(this.cartItems)[0];
      this.itemService.getItem(+firstItemId).subscribe((item) => {
        this.restaurantService.getRestaurant(item.restaurant_id!).subscribe((restaurant) => {
          this.currentRestaurant = restaurant;
          this.restaurantId = restaurant.restaurant_id;
          this.menus = restaurant.menus || [];

          // Call getDeliveryFees() once restaurant is fetched
          this.getDeliveryFees();
        });
      });
    }
  }

  getDeliveryFees(): void {
    const currentDateTime = new Date().toISOString();
    for (const vehicleType in this.deliveryFees) {
      this.deliveryFeeService.calculateDeliveryFee(this.currentRestaurant?.address?.city || '', vehicleType, currentDateTime).subscribe({
        next: (fee) => {
          this.deliveryFees[vehicleType] = fee.delivery_fee;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.deliveryFees[vehicleType] = error.statusText;
          } else {
            this.deliveryFees[vehicleType] = 'An error occurred during delivery fee calculation.';
          }
        },
      });
    }
  }

  addToCart(itemId: number) {
    if (itemId in this.cartItems) {
      this.cartItems[itemId]++;
    } else {
      this.cartItems[itemId] = 1;
    }
    this.cartLenght++;
    this.saveCart();
  }

  removeFromCart(itemId: number) {
    if (itemId in this.cartItems && this.cartItems[itemId] > 1) {
      this.cartItems[itemId]--;
    } else {
      delete this.cartItems[itemId];
    }
    this.cartLenght--;
    this.saveCart();
  }

  loadCart(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : {};
    this.cartLenght = Object.values(this.cartItems).reduce((a, b) => a + b, 0);
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getItemById(itemId: number) {
    for (const menu of this.menus) {
      if (menu.items) {
        for (const item of menu.items) {
          if (item.item_id === itemId) {
            return item;
          }
        }
      }
    }
    return null;
  }

  getTotalPrice(): number {
    let total = 0;
    for (const [itemId, quantity] of Object.entries(this.cartItems)) {
      const item = this.getItemById(+itemId);
      if (item && item.price) {
        total += item.price * quantity;
      }
    }
    return total;
  }

  submitOrder() {
    // Add your order submit logic here
  }

  goBack(): void {
    this.location.back();
  }
}
