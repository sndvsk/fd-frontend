import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '**', redirectTo: '/not-found' },
  { path: '', redirectTo: 'shared', pathMatch: 'full' },
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule) },
  { path: 'core', loadChildren: () => import('./core/core.module').then((m) => m.CoreModule) },
];

export const AppRoutingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules,
});
