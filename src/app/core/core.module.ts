import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { RoleSelectionComponent } from './authentication/role-selection/role-selection.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RoutingGuard } from './guards/routing.guard';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccessDeniedComponent,
    RoleSelectionComponent,
    NotFoundComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AccessDeniedComponent,
    RoleSelectionComponent,
    NotFoundComponent
  ],
  providers: [
    AuthenticationGuard,
    RoutingGuard
  ]
})
export class CoreModule { }
