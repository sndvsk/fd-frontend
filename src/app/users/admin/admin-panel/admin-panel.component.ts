import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  panel: 'displayOwners' | 'displayUsers' | 'displayOrders' | 'pendingOwners' = 'displayOwners';

  ngOnInit(): void {
    this.panel = 'displayOwners';
  }

  switchToDisplayOwnersPanel(): void {
    this.panel = 'displayOwners';
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
