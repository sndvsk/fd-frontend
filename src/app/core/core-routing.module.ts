import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RoutingGuard } from './guards/routing.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
        { path: 'login', component: LoginComponent, canActivate: [RoutingGuard] },
        { path: 'register', component: RegisterComponent },
        { path: 'logout', component: LogoutComponent, canActivate: [RoutingGuard] },
    ],
},
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'not-found', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
