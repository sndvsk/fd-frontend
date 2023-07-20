import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageRestaurantsComponent } from './manage-restaurants/manage-restaurants.component';
import { ManageMenusComponent } from './manage-menus/manage-menus.component';
import { ManageItemsComponent } from './manage-items/manage-items.component';
import { DisplayComponent } from './display/display.component';

@Component({
    selector: 'app-owner-panel',
    templateUrl: './owner-panel.component.html',
    styleUrls: ['./owner-panel.component.scss'],
})
export class OwnerPanelComponent implements OnInit {
    panel: 'display' | 'restaurants' | 'menus' | 'items' = 'display';
    ownerId?: number;

    @ViewChild(DisplayComponent) displayRestaurantsComponent!: DisplayComponent;
    @ViewChild(ManageRestaurantsComponent) manageRestaurantsComponent!: ManageRestaurantsComponent;
    @ViewChild(ManageMenusComponent) manageMenusComponent!: ManageMenusComponent;
    @ViewChild(ManageItemsComponent) manageItemsComponent!: ManageItemsComponent;

    ngOnInit(): void {
        const storedOwnerId = localStorage.getItem('user_id');
        if (storedOwnerId) {
            this.ownerId = Number(storedOwnerId);
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
