import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  panel: 'displayRestaurants' | 'displayUsers' | 'displayOrders' | 'pendingOwners' = 'displayRestaurants';

  ngOnInit(): void {
    this.panel = 'displayRestaurants';
  }

  switchToDisplayRestaurantsPanel(): void {
    this.panel = 'displayRestaurants';
  }

  switchToDisplayUsersPanel(): void {
    this.panel = 'displayUsers';
  }

  switchToDisplayOrdersPanel(): void {
    this.panel = 'displayOrders';
  }

  switchToPendingOwnersPanel(): void {
    this.panel = 'pendingOwners';
  }
}
