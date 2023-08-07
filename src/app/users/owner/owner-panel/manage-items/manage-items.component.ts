import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from 'src/app/core/services/restaurant-items/item.service';
import { Item } from 'src/app/models/restaurant-items/item';
import { AssignRestaurantDialogComponent } from '../dialogs/assign-restaurant-dialog/assign-restaurant-dialog.component';
import { AssignMenuDialogComponent } from '../dialogs/assing-menu-dialog/assign-menu-dialog.component';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss'],
})
export class ManageItemsComponent implements OnInit {
  @Input() restaurantId?: number;
  items: Item[] = [];
  ownerId?: number;
  editMode = false;
  isLargeScreen?: boolean;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  item: Partial<Item> = {
    item_id: undefined,
    name: undefined,
    description: undefined,
    price: undefined,
    image: undefined,
    ingredients: [],
    allergens: [],
    restaurant_id: undefined,
  };

  constructor(private itemService: ItemService, public dialog: MatDialog, private toast: HotToastService) {}

  ngOnInit(): void {
    this.checkScreenSize();
    const userRole = localStorage.getItem('user_role');
    const adminViewOwnerId = localStorage.getItem('admin_view_owner_id');
    const userId = localStorage.getItem('user_id');

    const storedOwnerId = adminViewOwnerId && userRole === 'ADMIN' ? adminViewOwnerId : userId;

    if (storedOwnerId) {
      this.ownerId = Number(storedOwnerId);
    }

    this.loadItems();
  }

  private checkScreenSize() {
    if (window.innerWidth < 1000) {
      this.isLargeScreen = false;
    } else {
      this.isLargeScreen = true;
    }
  }

  addItem() {
    this.editMode = true;
  }

  editItem(item: Item) {
    this.editMode = true;
    this.item = { ...item };
  }

  cancelEdit() {
    this.editMode = false;
    this.item = {};
    /*     const index = this.items.findIndex((i) => i.item_id === this.item.item_id);
    if (index !== -1) {
      this.item = { ...this.items[index] };
    } else {
      this.item = {};
    } */
  }

  loadItems() {
    if (this.ownerId) {
      this.itemService
        .getItemsByOwnerId(this.ownerId)
        .pipe(handleError(this.toast))
        .subscribe((items) => {
          const _items = Array.isArray(items) ? items : [items];
          this.items = _items.sort((a, b) => (a.item_id ? a.item_id : 0) - (b.item_id ? b.item_id : 0));
        });
    }
  }

  saveItem() {
    if (this.item && this.ownerId) {
      if (typeof this.item.ingredients === 'string') {
        this.item.ingredients = (this.item.ingredients as string).split(',').map((ingredient: string) => ingredient.trim());
      }
      if (typeof this.item.allergens === 'string') {
        this.item.allergens = (this.item.allergens as string).split(',').map((allergen: string) => allergen.trim());
      }

      if (this.item.item_id && this.item.name && this.item.restaurant_id) {
        this.itemService
          .patchItemInRestaurantMenu(this.item.item_id, this.item.restaurant_id, this.ownerId, this.item)
          .pipe(handleError(this.toast))
          .subscribe((updatedItem) => {
            const index = this.items.findIndex((item) => item.item_id === updatedItem.item_id);
            if (index !== -1) {
              this.items[index] = updatedItem;
            }
          });
      } else {
        if (this.item.name) {
          this.itemService
            .addItem(this.ownerId, this.item)
            .pipe(handleError(this.toast))
            .subscribe((newItem) => {
              this.items.push(newItem);
            });
        }
      }
    }
    this.editMode = false;
  }

  removeFromMenu(item: Item) {
    if (item.menu_id && this.ownerId && item.item_id && item.restaurant_id) {
      this.itemService
        .removeItemFromMenu(item.item_id, this.ownerId, item.restaurant_id, item.menu_id)
        .pipe(handleError(this.toast))
        .subscribe(() => {
          item.menu_id = null;
          this.loadItems();
        });
    }
  }

  removeFromRestaurant(item: Item) {
    if (item.restaurant_id && this.ownerId && item.item_id && item.restaurant_id) {
      this.itemService
        .removeItemFromRestaurant(item.item_id, this.ownerId, item.restaurant_id)
        .pipe(handleError(this.toast))
        .subscribe(() => {
          item.restaurant_id = null;
          this.loadItems();
        });
    }
  }

  deleteItem(itemId?: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { entityType: 'item' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (itemId && this.ownerId) {
          this.itemService
            .deleteItem(itemId, this.ownerId)
            .pipe(handleError(this.toast))
            .subscribe(() => {
              this.items = this.items.filter((i) => i.item_id !== itemId);
            });
        }
      }
    });
  }

  assignToMenu(item: Item) {
    const dialogRef = this.dialog.open(AssignMenuDialogComponent, {
      data: {
        item: item,
        ownerId: this.ownerId,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(handleError(this.toast))
      .subscribe((updatedItem: Item) => {
        if (updatedItem) {
          const index = this.items.findIndex((i) => i.item_id === updatedItem.item_id);
          if (index !== -1) {
            this.items[index] = updatedItem;
          } else {
            this.items.push(updatedItem);
          }
        }
      });
    this.loadItems();
  }

  assignToRestaurant(item: Item) {
    const dialogRef = this.dialog.open(AssignRestaurantDialogComponent, {
      data: {
        item: item,
        ownerId: this.ownerId,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(handleError(this.toast))
      .subscribe((updatedItem: Item) => {
        if (updatedItem) {
          const index = this.items.findIndex((i) => i.item_id === updatedItem.item_id);
          if (index !== -1) {
            this.items[index] = updatedItem;
          } else {
            this.items.push(updatedItem);
          }
        }
      });
    this.loadItems();
  }
}
