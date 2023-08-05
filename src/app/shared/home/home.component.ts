import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Roles } from 'src/app/models/user-items/roles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userRole: Roles | undefined | string;

  constructor(private authenticationService: AuthenticationService, private toast: HotToastService) {}

  ngOnInit(): void {
    this.refreshOnInit();
  }

  public userRolesData: { [key: string]: { h1: string; h1Span: string; routerLink: string; btnText: string } } = {
    CUSTOMER: {
      h1: 'Order Your Product',
      h1Span: 'Easier & Faster.',
      routerLink: '/customer/restaurant',
      btnText: 'Go to Menu',
    },
    OWNER: {
      h1: 'Manage Your Restaurant',
      h1Span: 'Easier & Faster.',
      routerLink: '/owner/panel',
      btnText: 'Go to Owner Panel',
    },
    ADMIN: {
      h1: 'Admin The App',
      h1Span: 'Easier & Faster.',
      routerLink: '/admin/panel',
      btnText: 'Go to Admin Panel',
    },
    none: {
      h1: 'Sign in and order food',
      h1Span: 'Easier & Faster.',
      routerLink: '/auth/login',
      btnText: 'Go to Sign in',
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
