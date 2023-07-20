import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  restaurants: Restaurant[] = [];
  ownerId?: number;

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
}
