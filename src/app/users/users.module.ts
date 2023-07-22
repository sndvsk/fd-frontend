import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { CartComponent } from './customer/cart/cart.component';
import { OwnerPanelComponent } from './owner/owner-panel/owner-panel.component';
import { OwnerOrdersComponent } from './owner/owner-orders/owner-orders.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageRestaurantsComponent } from './owner/owner-panel/manage-restaurants/manage-restaurants.component';
import { ManageMenusComponent } from './owner/owner-panel/manage-menus/manage-menus.component';
import { ManageItemsComponent } from './owner/owner-panel/manage-items/manage-items.component';
import { DisplayComponent } from './owner/owner-panel/display/display.component';
import { AssignRestaurantDialogComponent } from './owner/owner-panel/dialogs/assign-restaurant-dialog/assign-restaurant-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignMenuDialogComponent } from './owner/owner-panel/dialogs/assing-menu-dialog/assign-menu-dialog.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    SettingsComponent,
    OwnerPanelComponent,
    OwnerOrdersComponent,
    CustomerOrdersComponent,
    CartComponent,
    UserDetailsComponent,
    ManageRestaurantsComponent,
    ManageMenusComponent,
    ManageItemsComponent,
    DisplayComponent,
    AssignRestaurantDialogComponent,
    AssignMenuDialogComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
  ],
  exports: [UserDetailsComponent],
})
export class UsersModule {}
