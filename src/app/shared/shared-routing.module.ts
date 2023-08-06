import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutingGuard } from '../core/guards/routing.guard';
import { AuthenticationGuard } from '../core/guards/authentication.guard';

import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './others/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './others/about-us/about-us.component';
import { TermsOfUseComponent } from './others/terms-of-use/terms-of-use.component';
import { ContactUsComponent } from './others/contact-us/contact-us.component';
import { HelpUsersComponent } from './others/help-users/help-users.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'auth',
    canActivate: [RoutingGuard, AuthenticationGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'terms-of-service', component: TermsOfUseComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'help', component: HelpUsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
