import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailsComponent } from './user-details/user-details.component';
import { OwnerOrdersComponent } from './owner/owner-orders/owner-orders.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { OwnerPanelComponent } from './owner/owner-panel/owner-panel.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { RestaurantListComponent } from './customer/restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './customer/restaurant-detail/restaurant-detail.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { DisplayComponent } from './owner/owner-panel/display/display.component';
import { ManageItemsComponent } from './owner/owner-panel/manage-items/manage-items.component';
import { ManageMenusComponent } from './owner/owner-panel/manage-menus/manage-menus.component';
import { ManageRestaurantsComponent } from './owner/owner-panel/manage-restaurants/manage-restaurants.component';
import { DisplayOrdersComponent } from './admin/admin-panel/display-orders/display-orders.component';
import { DisplayUsersComponent } from './admin/admin-panel/display-users/display-users.component';
import { PendingOwnersComponent } from './admin/admin-panel/pending-owners/pending-owners.component';
import { DisplayOwnersComponent } from './admin/admin-panel/display-owners/display-owners.component';
import { DirectionsComponent } from './customer/directions/directions.component';
import { CheckoutNavigationGuard } from '../core/guards/checkout-navigation.guard';
import { RoutingGuard } from '../core/guards/routing.guard';
import { AuthenticationGuard } from '../core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [RoutingGuard, AuthenticationGuard],
    children: [
      { path: 'panel', component: AdminPanelComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'display/orders', component: DisplayOrdersComponent },
      { path: 'display/owners', component: DisplayOwnersComponent },
      { path: 'display/users', component: DisplayUsersComponent },
      { path: 'pending-owners', component: PendingOwnersComponent },
    ],
  },
  {
    path: 'owner',
    canActivate: [RoutingGuard, AuthenticationGuard],
    children: [
      { path: 'panel', component: OwnerPanelComponent },
      { path: 'orders', component: OwnerOrdersComponent },
      { path: 'display', component: DisplayComponent },
      { path: 'manage/items', component: ManageItemsComponent },
      { path: 'manage/menus', component: ManageMenusComponent },
      { path: 'manage/restaurants', component: ManageRestaurantsComponent },
    ],
  },
  {
    path: 'customer',
    canActivate: [RoutingGuard, AuthenticationGuard],
    children: [
      { path: 'orders', component: CustomerOrdersComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'restaurant', component: RestaurantListComponent },
      { path: 'restaurant/:id', component: RestaurantDetailComponent },
      { path: 'directions', component: DirectionsComponent, canActivate: [CheckoutNavigationGuard] },
    ],
  },
  { path: 'user-details', component: UserDetailsComponent, canActivate: [RoutingGuard, AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
