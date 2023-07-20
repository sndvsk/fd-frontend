import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailsComponent } from './user-details/user-details.component';
import { OwnerOrdersComponent } from './owner/owner-orders/owner-orders.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { CartComponent } from './customer/cart/cart.component';
import { OwnerPanelComponent } from './owner/owner-panel/owner-panel.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { SettingsComponent } from './admin/settings/settings.component';

const routes: Routes = [
	{
		path: 'admin',
		children: [
			{ path: 'panel', component: AdminPanelComponent },
			{ path: 'settings', component: SettingsComponent },
		],
	},
	{
		path: 'owner',
		children: [
			{ path: 'panel', component: OwnerPanelComponent },
			{ path: 'orders', component: OwnerOrdersComponent },
		],
	},
	{
		path: 'customer',
		children: [
			{ path: 'orders', component: CustomerOrdersComponent },
			{ path: 'cart', component: CartComponent },
		],
	},
	{ path: 'user-details', component: UserDetailsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsersRoutingModule {}
