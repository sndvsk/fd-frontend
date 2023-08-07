import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { normalizeArray } from 'src/app/core/utils/utils';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';
import { RestaurantTheme } from 'src/app/models/restaurant-items/restaurant-theme';
import { Address } from 'src/app/models/user-items/address';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private restaurantService: RestaurantService, private toast: HotToastService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('user_role');
    const adminViewOwnerId = localStorage.getItem('admin_view_owner_id');
    const userId = localStorage.getItem('user_id');

    const storedOwnerId = adminViewOwnerId && userRole === 'ADMIN' ? adminViewOwnerId : userId;

    if (storedOwnerId) {
      this.ownerId = Number(storedOwnerId);
    }
    if (this.ownerId) {
      this.restaurantService
        .getRestaurantsByOwnerId(this.ownerId)
        .pipe(handleError(this.toast))
        .subscribe((restaurants) => {
          this.restaurants = normalizeArray(restaurants);
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
          .pipe(handleError(this.toast))
          .subscribe((updatedRestaurant) => {
            const index = this.restaurants.findIndex((restaurant) => restaurant.restaurant_id === updatedRestaurant.restaurant_id);
            if (index !== -1) {
              this.restaurants[index] = updatedRestaurant;
            }
          });
      } else if (this.ownerId) {
        this.restaurantService
          .createRestaurant(this.ownerId, this.restaurant)
          .pipe(handleError(this.toast))
          .subscribe((newRestaurant) => {
            this.restaurants.push(newRestaurant);
          });
      }
    }
    this.editMode = false;
  }

  deleteRestaurant(restaurantId?: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { entityType: 'restaunrant' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (restaurantId && this.ownerId) {
          this.restaurantService
            .deleteRestaurant(restaurantId, this.ownerId)
            .pipe(handleError(this.toast))
            .subscribe(() => {
              // Remove the restaurant from the list after the deletion is complete
              this.restaurants = this.restaurants.filter((r) => r.restaurant_id !== restaurantId);
            });
        }
      }
    });
  }
}
