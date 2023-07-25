import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { CartStateService } from 'src/app/core/services/state/cart-state.service';
import { Menu } from 'src/app/models/restaurant-items/menu';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
})
export class RestaurantDetailComponent implements OnInit {
  restaurantId: number;
  currentRestaurant?: Restaurant;
  menus: Menu[] = [];
  cartItems: { [itemId: number]: number } = {};
  vehicleType?: string;
  cartLenght = 0;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router,
    private cartStateService: CartStateService
  ) {
    // Assume restaurantId is being passed in as a route parameter
    this.restaurantId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadCart();
    this.restaurantService.getRestaurant(this.restaurantId).subscribe((data: Restaurant) => {
      this.currentRestaurant = data;
      if (this.currentRestaurant.menus) {
        this.menus = this.currentRestaurant.menus;
      }
    });
  }

  addToCart(itemId: number, restaurantId: number) {
    const currentRestaurantInCart = localStorage.getItem('restaurantId');

    if (currentRestaurantInCart && currentRestaurantInCart !== restaurantId.toString()) {
      alert('You can only order from one restaurant at a time. Please clear your cart before adding items from a different restaurant.');
    } else {
      localStorage.setItem('restaurantId', restaurantId.toString());

      if (itemId in this.cartItems) {
        this.cartItems[itemId]++;
      } else {
        this.cartItems[itemId] = 1;
      }
      this.cartLenght++;
      this.saveCart();
    }
  }

  removeFromCart(itemId: number) {
    if (itemId in this.cartItems && this.cartItems[itemId] > 1) {
      this.cartItems[itemId]--;
    } else {
      delete this.cartItems[itemId];
    }
    this.cartLenght--;
    this.saveCart();

    if (this.cartLenght === 0) {
      localStorage.removeItem('restaurantId');
    }
  }

  loadCart(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : {};
    this.cartLenght = Object.values(this.cartItems).reduce((a, b) => a + b, 0);

    if (this.cartLenght === 0) {
      localStorage.removeItem('restaurantId');
    }
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

  checkout() {
    if (Object.keys(this.cartItems).length > 0) {
      this.cartStateService.setCheckoutState(this.cartItems, this.restaurantId, this.currentRestaurant!, this.menus);
      this.router.navigate(['/customer/checkout']);
      /*       this.router.navigate(['/customer/checkout'], {
        state: {
          cartItems: this.cartItems,
          restaurantId: this.restaurantId,
          currentRestaurant: this.currentRestaurant,
          menus: this.menus,
        },
      }); */
    } else {
      console.log('No items in the cart');
    }
  }
}
