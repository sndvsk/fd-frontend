import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HamburgerToggleDirective } from './header/hamburger-toggle.directive';
import { SharedRoutingModule } from './shared-routing.module';
import { PrivacyPolicyComponent } from './others/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './others/about-us/about-us.component';
import { TermsOfUseComponent } from './others/terms-of-use/terms-of-use.component';
import { ContactUsComponent } from './others/contact-us/contact-us.component';
import { MatButtonModule } from '@angular/material/button';
import { HelpUsersComponent } from './others/help-users/help-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { RegisterComponent } from './authentication/register/register.component';
import { RoleSelectionComponent } from './authentication/role-selection/role-selection.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HamburgerToggleDirective,
    PrivacyPolicyComponent,
    AboutUsComponent,
    TermsOfUseComponent,
    ContactUsComponent,
    HelpUsersComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RoleSelectionComponent,
    AccessDeniedComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [HeaderComponent, FooterComponent, HomeComponent],
})
export class SharedModule {}
