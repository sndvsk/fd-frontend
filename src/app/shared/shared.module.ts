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
  ],
  imports: [CommonModule, SharedRoutingModule, RouterModule, MatButtonModule],
  exports: [HeaderComponent, FooterComponent, HomeComponent],
})
export class SharedModule {}
