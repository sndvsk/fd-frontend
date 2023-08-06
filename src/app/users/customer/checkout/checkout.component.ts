import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';
import { DeliveryFeeService } from 'src/app/core/services/delivery-fee/delivery-fee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Menu } from 'src/app/models/restaurant-items/menu';
import { ItemService } from 'src/app/core/services/restaurant-items/item.service';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { OrderService } from 'src/app/core/services/restaurant-items/order.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { CartStateService } from 'src/app/core/services/state/cart-state.service';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

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
  orderPlaced = false;
  deliveryError: string | null = null;

  constructor(
    private router: Router,
    private location: Location,
    private deliveryFeeService: DeliveryFeeService,
    private restaurantService: RestaurantService,
    private itemService: ItemService,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private cartStateService: CartStateService,
    private toast: HotToastService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.loadCart();

    // Subscribe to the checkout state
    this.cartStateService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;

      // Fetch the item details using the ID of the first item in the cart
      const firstItemId = Object.keys(this.cartItems)[0];
      if (firstItemId && !this.restaurantId) {
        this.itemService
          .getItem(+firstItemId)
          .pipe(handleError(this.toast))
          .subscribe((item) => {
            this.restaurantService
              .getRestaurant(item.restaurant_id!)
              .pipe(handleError(this.toast))
              .subscribe((restaurant) => {
                this.currentRestaurant = restaurant;
                this.restaurantId = restaurant.restaurant_id;
                this.menus = restaurant.menus || [];

                // Call getDeliveryFees() once restaurant is fetched
                this.getDeliveryFees();
              });
          });
      } else {
        // Call getDeliveryFees() if state is defined
        this.getDeliveryFees();
      }
    });

    this.cartStateService.restaurantId$.subscribe((restaurantId) => {
      this.restaurantId = restaurantId;
    });

    this.cartStateService.currentRestaurant$.subscribe((currentRestaurant) => {
      this.currentRestaurant = currentRestaurant;
    });

    this.cartStateService.menus$.subscribe((menus) => {
      this.menus = menus || [];
    });
  }

  isString(value: number | string): boolean {
    return typeof value === 'string';
  }

  getDeliveryFees(): void {
    if (!this.currentRestaurant) {
      // If no current restaurant, set the error message and leave this.deliveryFees[vehicleType] as empty.
      this.deliveryError = 'Error: No current restaurant. Have you added something to the cart?';
      return;
    }
    this.deliveryError = null;

    const currentDateTime = new Date().toISOString();
    for (const vehicleType in this.deliveryFees) {
      this.deliveryFeeService
        .calculateDeliveryFee(this.currentRestaurant?.address?.city || '', vehicleType, currentDateTime)
        .pipe(handleError(this.toast))
        .subscribe({
          next: (fee) => {
            this.deliveryFees[vehicleType] = fee.delivery_fee;
          },
          error: (error) => {
            this.deliveryFees[vehicleType] =
              'Error: ' + (error instanceof HttpErrorResponse ? error.statusText : 'An error occurred during delivery fee calculation.');
          },
        });
    }
  }

  addToCart(itemId: number, restaurantId: number) {
    // ONLY let the CartStateService manage the logic
    this.cartStateService.addToItem(itemId, restaurantId);
  }

  removeFromCart(itemId: number) {
    // ONLY let the CartStateService manage the logic
    this.cartStateService.removeItem(itemId);
  }

  loadCart(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : {};
    this.cartLenght = Object.values(this.cartItems).reduce((a, b) => a + b, 0);

    if (this.cartLenght === 0) {
      localStorage.removeItem('restaurantId');
      this.resetDeliveryFees();
    }
  }

  resetDeliveryFees(): void {
    this.deliveryFees = {
      car: '',
      bike: '',
      scooter: '',
    };
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

  getSelectedDeliveryFee(): number | string {
    return this.deliveryFees[this.selectedVehicleType || 0];
  }

  getTotalPriceWithDelivery(): number | string {
    const deliveryFee = this.getSelectedDeliveryFee();
    return typeof deliveryFee === 'number' ? this.getTotalPrice() + deliveryFee : 'Error in calculating delivery fee';
  }

  submitOrder(): void {
    if (Object.keys(this.cartItems).length > 0) {
      const customerId = Number(this.authService.getUserId());
      this.orderService
        .createOrder(customerId, this.restaurantId!)
        .pipe(handleError(this.toast))
        .subscribe((response) => {
          console.log('Order created');
          if (response.order_id && this.currentRestaurant?.address?.city && this.selectedVehicleType) {
            const items = JSON.stringify(this.cartItems);
            this.orderService
              .updateOrder(response.order_id, this.currentRestaurant?.address?.city, this.selectedVehicleType, items, customerId)
              .pipe(handleError(this.toast))
              .subscribe(() => {
                console.log('Order updated');
                this.cartItems = {};
                this.saveCart();
                this.orderPlaced = true;
                this.resetDeliveryFees();
                this.cartStateService.clearCheckoutState();
                this.navigationService.setNavigationFromCheckout(true);
                this.router.navigate(['/customer/directions'], {
                  queryParams: { restaurantId: this.restaurantId, vehicleType: this.selectedVehicleType },
                });
                this.selectedVehicleType = undefined;
              });
          }
        });
    } else {
      console.log('No items in the cart');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
