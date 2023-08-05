import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './others/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './others/about-us/about-us.component';
import { TermsOfUseComponent } from './others/terms-of-use/terms-of-use.component';
import { ContactUsComponent } from './others/contact-us/contact-us.component';
import { HelpUsersComponent } from './others/help-users/help-users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
