import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuService } from 'src/app/core/services/restaurant-items/menu.service';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { ItemService } from 'src/app/core/services/restaurant-items/item.service';
import { Menu } from 'src/app/models/restaurant-items/menu';
import { Item } from 'src/app/models/restaurant-items/item';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';

interface DialogData {
  menu?: Menu;
  item?: Item;
  ownerId: number;
}

@Component({
  selector: 'app-assign-restaurant-dialog',
  templateUrl: './assign-restaurant-dialog.component.html',
})
export class AssignRestaurantDialogComponent {
  restaurants: Restaurant[] = [];
  ownerId?: number;
  selectedRestaurant = 0; // Initialized with 0

  constructor(
    public dialogRef: MatDialogRef<AssignRestaurantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private itemService: ItemService
  ) {
    this.ownerId = data.ownerId;
    this.fetchRestaurants();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchRestaurants(): void {
    if (this.ownerId) {
      this.restaurantService.getRestaurantsByOwnerId(this.ownerId).subscribe((restaurants) => {
        this.restaurants = restaurants;
      });
    }
  }

  onOkClick(): void {
    if (this.selectedRestaurant && this.ownerId) {
      if (this.data.menu && this.data.menu.menu_id) {
        // If menu data exists, add menu to restaurant
        this.menuService.addMenuToRestaurant(this.selectedRestaurant, this.data.menu.menu_id, this.ownerId).subscribe((updatedMenu) => {
          this.dialogRef.close(updatedMenu);
        });
      } else if (this.data.item && this.data.item.item_id) {
        // If item data exists, add item to restaurant
        this.itemService.addItemToRestaurant(this.selectedRestaurant, this.ownerId, this.data.item.item_id).subscribe((updatedItem) => {
          this.dialogRef.close(updatedItem);
        });
      }
    }
  }
}
