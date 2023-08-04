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
import { RestaurantListComponent } from './customer/restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './customer/restaurant-detail/restaurant-detail.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DisplayUsersComponent } from './admin/admin-panel/display-users/display-users.component';
import { DisplayOrdersComponent } from './admin/admin-panel/display-orders/display-orders.component';
import { PendingOwnersComponent } from './admin/admin-panel/pending-owners/pending-owners.component';
import { CapitalizeFirstPipe } from '../core/pipes/capitalize-first';
import { DisplayOwnersComponent } from './admin/admin-panel/display-owners/display-owners.component';
import { DirectionsComponent } from './customer/directions/directions.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule, JsonpInterceptor } from '@angular/common/http';

@NgModule({
  declarations: [
    AdminPanelComponent,
    SettingsComponent,
    OwnerPanelComponent,
    OwnerOrdersComponent,
    CustomerOrdersComponent,
    UserDetailsComponent,
    ManageRestaurantsComponent,
    ManageMenusComponent,
    ManageItemsComponent,
    DisplayComponent,
    AssignRestaurantDialogComponent,
    AssignMenuDialogComponent,
    RestaurantListComponent,
    RestaurantDetailComponent,
    CheckoutComponent,
    DisplayUsersComponent,
    DisplayOrdersComponent,
    PendingOwnersComponent,
    CapitalizeFirstPipe,
    DisplayOwnersComponent,
    DirectionsComponent,
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
    MatTableModule,
    MatSortModule,
    HttpClientJsonpModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  exports: [UserDetailsComponent, DirectionsComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true }],
})
export class UsersModule {}
