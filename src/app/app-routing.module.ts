import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  //{ path: '**', redirectTo: '/not-found' },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule) },
  { path: '', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule) },
  { path: '', loadChildren: () => import('./core/core.module').then((m) => m.CoreModule) },
];

export const AppRoutingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
