import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/core/services/restaurant-items/menu.service';
import { Menu } from 'src/app/models/restaurant-items/menu';
import { AssignRestaurantDialogComponent } from '../dialogs/assign-restaurant-dialog/assign-restaurant-dialog.component';

@Component({
  selector: 'app-manage-menus',
  templateUrl: './manage-menus.component.html',
  styleUrls: ['./manage-menus.component.scss'],
})
export class ManageMenusComponent implements OnInit {
  @Input() restaurantId?: number;
  menus: Menu[] = [];
  ownerId?: number;

  editMode = false;

  menu: Partial<Menu> = {
    menu_id: undefined,
    name: undefined,
    restaurant_id: undefined,
    items: undefined,
    visibility: undefined,
  };

  constructor(private menuService: MenuService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const storedOwnerId = localStorage.getItem('user_id');
    if (storedOwnerId) {
      this.ownerId = Number(storedOwnerId);
    }
    if (this.ownerId) {
      this.menuService.getMenusByOwnerId(this.ownerId).subscribe((menus) => {
        this.menus = menus;
      });
    }
  }

  addMenu() {
    this.editMode = true;
  }

  editMenu(menu: Menu) {
    this.editMode = true;
    this.menu = { ...menu };
  }

  cancelEdit() {
    this.editMode = false;
    this.menu = {};
    /*     const index = this.menus.findIndex((m) => m.menu_id === this.menu.menu_id);
    if (index !== -1) {
      this.menu = { ...this.menus[index] };
    } else {
      this.menu = {};
    } */
  }

  toggleMenuVisibility(menuId?: number) {
    if (menuId && this.ownerId) {
      this.menuService.toggleMenuVisibility(menuId, this.ownerId).subscribe((updatedMenu) => {
        const index = this.menus.findIndex((menu) => menu.menu_id === updatedMenu.menu_id);
        if (index !== -1) {
          this.menus[index] = updatedMenu;
          // If currently edited menu is the one we are toggling visibility for, update this.menu as well
          if (this.menu.menu_id === updatedMenu.menu_id) {
            this.menu = { ...updatedMenu };
          }
        }
      });
    }
  }

  saveMenu() {
    if (this.menu && this.ownerId) {
      if (this.menu.menu_id && this.menu.name) {
        this.menuService.patchMenu(this.menu.menu_id, this.menu.name, this.ownerId).subscribe((updatedMenu) => {
          const index = this.menus.findIndex((menu) => menu.menu_id === updatedMenu.menu_id);
          if (index !== -1) {
            this.menus[index] = updatedMenu;
          }
        });
      } else {
        if (this.menu.name) {
          this.menuService.addMenu(this.ownerId, this.menu.name).subscribe((newMenu) => {
            this.menus.push(newMenu);
          });
        }
      }
    }
    this.editMode = false;
  }

  removeMenuFromRestaurant(menu: Menu) {
    if (menu.menu_id && this.ownerId && menu.restaurant_id) {
      this.menuService.removeMenuFromRestaurant(menu.menu_id, this.ownerId, menu.restaurant_id).subscribe(() => {
        // Update the menu's restaurant_id with null
        menu.restaurant_id = null;
      });
    }
  }

  deleteMenu(menuId?: number) {
    if (menuId && this.ownerId) {
      this.menuService.deleteMenu(menuId, this.ownerId).subscribe(() => {
        // Remove the menu from the list after the deletion is complete
        this.menus = this.menus.filter((m) => m.menu_id !== menuId);
      });
    }
  }

  openAssignRestaurantDialog(menu: Menu) {
    const dialogRef = this.dialog.open(AssignRestaurantDialogComponent, {
      width: '250px',
      data: { menu: menu, ownerId: this.ownerId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the menu's restaurant_id with the selected restaurant id
        menu.restaurant_id = result;
        menu.visibility = result.visibility;
      }
    });
  }
}
