import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Roles } from 'src/app/models/user-items/roles';

@Component({
  selector: 'app-help-users',
  templateUrl: './help-users.component.html',
  styleUrls: ['./help-users.component.scss'],
})
export class HelpUsersComponent implements OnInit {
  public userRole: Roles | undefined | string;

  constructor(private authenticationService: AuthenticationService, private toast: HotToastService) {}

  ngOnInit(): void {
    this.refreshOnInit();
  }

  public userRolesData: { [key: string]: { h1: string; h1Span: string; content: string; routerLink: string; btnText: string } } = {
    ADMIN: {
      h1: 'Help for',
      h1Span: 'admins',
      content: 'Help content for admins.',
      routerLink: '/admin/panel',
      btnText: 'Admin Panel',
    },
    OWNER: {
      h1: 'Help for',
      h1Span: 'owners',
      content: 'Help content for owners.',
      routerLink: '/owner/panel',
      btnText: 'Owner Panel',
    },
    CUSTOMER: {
      h1: 'Help for',
      h1Span: 'customers',
      content: 'Help content for customers.',
      routerLink: '/customer/restaurants',
      btnText: 'Menu',
    },
    none: {
      h1: 'Help for',
      h1Span: 'unregistered users',
      content: 'Help content for users.',
      routerLink: '/auth/register',
      btnText: 'Register',
    },
  };

  refreshOnInit() {
    this.authenticationService
      .getUserRole()
      .pipe(handleError(this.toast))
      .subscribe((role) => {
        this.userRole = (role as Roles) || 'none';
      });
  }
}
