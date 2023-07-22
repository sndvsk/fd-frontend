import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuService } from 'src/app/core/services/restaurant-items/menu.service';
import { ItemService } from 'src/app/core/services/restaurant-items/item.service';
import { Menu } from 'src/app/models/restaurant-items/menu';
import { Item } from 'src/app/models/restaurant-items/item';

interface DialogData {
  item: Item;
  ownerId: number;
}

@Component({
  selector: 'app-assign-menu-dialog',
  templateUrl: './assign-menu-dialog.component.html',
})
export class AssignMenuDialogComponent {
  menus: Menu[] = [];
  ownerId?: number;
  selectedMenu = 0; // Initialized with 0

  constructor(
    public dialogRef: MatDialogRef<AssignMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private menuService: MenuService,
    private itemService: ItemService
  ) {
    this.ownerId = data.ownerId;
    this.fetchMenus();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchMenus(): void {
    if (this.ownerId) {
      this.menuService.getMenusByOwnerId(this.ownerId).subscribe((menus) => {
        this.menus = menus;
      });
    }
  }

  onOkClick(): void {
    if (this.selectedMenu && this.ownerId && this.data.item && this.data.item.item_id) {
      this.itemService.addItemToMenu(this.selectedMenu, this.ownerId, this.data.item.item_id).subscribe((updatedItem) => {
        this.dialogRef.close(updatedItem);
      });
    }
  }
}
