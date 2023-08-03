import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError } from 'rxjs';

import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router, private toast: HotToastService) {}

  ngOnInit(): void {
    this.restaurantService
      .getAllRestaurants()
      .pipe(
        catchError((error) => {
          this.toast.error(`Error.<br>Status: ${error.status}<br>Message: ${error.statusText}`);
          throw error;
        })
      )
      .subscribe((data: Restaurant[]) => {
        this.restaurants = data;
      });
  }

  viewMenu(restaurantId: number) {
    this.router.navigate(['/customer/restaurant', restaurantId]);
  }
}
