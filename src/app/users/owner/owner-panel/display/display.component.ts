import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { normalizeArray } from 'src/app/core/utils/utils';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  restaurants: Restaurant[] = [];
  ownerId?: number;

  constructor(private restaurantService: RestaurantService, private toast: HotToastService) {}

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
}
