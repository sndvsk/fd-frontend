import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';
import { RestaurantTheme } from 'src/app/models/restaurant-items/restaurant-theme';
import { Address } from 'src/app/models/user-items/address';

@Component({
  selector: 'app-manage-restaurants',
  templateUrl: './manage-restaurants.component.html',
  styleUrls: ['./manage-restaurants.component.scss'],
})
export class ManageRestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  ownerId?: number;

  editMode = false;
  restaurantAddress: Partial<Address> = {
    country: undefined,
    county: undefined,
    city: undefined,
    zip_code: undefined,
    street: undefined,
    house_number: undefined,
    apt_number: undefined,
  };

  restaurant: Partial<Restaurant> = {
    restaurant_id: undefined,
    name: undefined,
    description: undefined,
    theme: undefined,
    phone: undefined,
    image: undefined,
    address: this.restaurantAddress,
  };

  restaurantThemes = Object.values(RestaurantTheme).slice(0, Object.keys(RestaurantTheme).length / 2);

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    const storedOwnerId = localStorage.getItem('user_id');
    if (storedOwnerId) {
      this.ownerId = Number(storedOwnerId);
    }
    if (this.ownerId) {
      this.restaurantService.getRestaurantsByOwnerId(this.ownerId).subscribe((restaurants) => {
        this.restaurants = restaurants;
      });
    }
  }

  addRestaurant() {
    this.editMode = true;
  }

  editRestaurant(restaurant: Restaurant) {
    this.editMode = true;
    this.restaurant = { ...restaurant };
    this.restaurantAddress = restaurant.address ? { ...restaurant.address } : {};
  }

  cancelEdit() {
    this.editMode = false;
    this.restaurant = {};
    this.restaurantAddress = {};
    /*     const index = this.restaurants.findIndex((r) => r.restaurant_id === this.restaurant.restaurant_id);
    if (index !== -1) {
      this.restaurant = { ...this.restaurants[index] };
      this.restaurantAddress = this.restaurants[index].address ? { ...this.restaurants[index].address } : {};
    } else {
      this.restaurant = {};
      this.restaurantAddress = {};
    } */
  }

  saveRestaurant() {
    if (this.restaurant && this.restaurantAddress) {
      // Add address to restaurant
      this.restaurant.address = this.restaurantAddress;

      if (this.restaurant.restaurant_id && this.ownerId) {
        this.restaurantService
          .updateRestaurant(this.restaurant.restaurant_id, this.ownerId, this.restaurant)
          .subscribe((updatedRestaurant) => {
            const index = this.restaurants.findIndex((restaurant) => restaurant.restaurant_id === updatedRestaurant.restaurant_id);
            if (index !== -1) {
              this.restaurants[index] = updatedRestaurant;
            }
          });
      } else if (this.ownerId) {
        this.restaurantService.createRestaurant(this.ownerId, this.restaurant).subscribe((newRestaurant) => {
          this.restaurants.push(newRestaurant);
        });
      }
    }
    this.editMode = false;
  }

  deleteRestaurant(restaurantId?: number) {
    if (restaurantId && this.ownerId) {
      this.restaurantService.deleteRestaurant(restaurantId, this.ownerId).subscribe(() => {
        // Remove the restaurant from the list after the deletion is complete
        this.restaurants = this.restaurants.filter((r) => r.restaurant_id !== restaurantId);
      });
    }
  }
}
