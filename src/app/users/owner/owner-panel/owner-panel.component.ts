import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageRestaurantsComponent } from './manage-restaurants/manage-restaurants.component';
import { ManageMenusComponent } from './manage-menus/manage-menus.component';
import { ManageItemsComponent } from './manage-items/manage-items.component';
import { DisplayComponent } from './display/display.component';
import { OwnerService } from 'src/app/core/services/user-items/owner.service';
import { handleError } from 'src/app/core/handlers/error-toast';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-owner-panel',
  templateUrl: './owner-panel.component.html',
  styleUrls: ['./owner-panel.component.scss'],
})
export class OwnerPanelComponent implements OnInit {
  panel: 'display' | 'restaurants' | 'menus' | 'items' = 'display';
  ownerId?: number;
  ownerApproved?: boolean;

  @ViewChild(DisplayComponent) displayRestaurantsComponent!: DisplayComponent;
  @ViewChild(ManageRestaurantsComponent) manageRestaurantsComponent!: ManageRestaurantsComponent;
  @ViewChild(ManageMenusComponent) manageMenusComponent!: ManageMenusComponent;
  @ViewChild(ManageItemsComponent) manageItemsComponent!: ManageItemsComponent;

  constructor(private ownerService: OwnerService, private toast: HotToastService) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('user_role');
    const adminViewOwnerId = localStorage.getItem('admin_view_owner_id');
    const userId = localStorage.getItem('user_id');

    const storedOwnerId = adminViewOwnerId && userRole === 'ADMIN' ? adminViewOwnerId : userId;

    if (storedOwnerId) {
      this.ownerId = Number(storedOwnerId);
    }

    if (this.ownerId) {
      this.ownerService
        .getOwner(this.ownerId)
        .pipe(handleError(this.toast))
        .subscribe((owner) => {
          this.ownerApproved = owner.approved;
          if (!this.ownerApproved) {
            this.toast.info(`You are not yet approved as an owner.<br>Please wait until you are or contact administration.`);
          }
        });
    }

    this.panel = 'display';
  }

  // Methods to switch between panels
  switchToDisplayPanel(): void {
    this.panel = 'display';
  }

  switchToRestaurantsPanel(): void {
    this.panel = 'restaurants';
  }

  switchToMenusPanel(): void {
    this.panel = 'menus';
  }

  switchToItemsPanel(): void {
    this.panel = 'items';
  }
}
