import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CustomerService } from 'src/app/core/services/user-items/customer.service';
import { Roles } from 'src/app/models/user-items/roles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userRole: Roles | undefined | string;
  public userId?: number;
  public isCustomerAddress?: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private toast: HotToastService,
    private customerService: CustomerService
  ) {}

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
        if (this.userRole === 'CUSTOMER') {
          this.handleCustomerAddress();
        }
      });
  }

  handleCustomerAddress() {
    if (this.isAddressInLocalStorage()) {
      this.checkAddressStatusAndWarn();
    } else {
      this.fetchAndStoreAddress();
    }
  }

  isAddressInLocalStorage(): boolean {
    const isCustomerAddress = localStorage.getItem('isCustomerAddress');
    if (isCustomerAddress) {
      this.isCustomerAddress = isCustomerAddress === 'true';
      return true;
    }
    return false;
  }

  checkAddressStatusAndWarn() {
    if (!this.isCustomerAddress) {
      this.showAddressWarning();
    }
  }

  fetchAndStoreAddress() {
    this.userId = Number(localStorage.getItem('user_id'));
    if (this.userId) {
      this.customerService
        .getAddress(this.userId)
        .pipe(handleError(this.toast))
        .subscribe((address) => {
          const isNotAddress = Object.keys(address).length === 0;
          localStorage.setItem('isCustomerAddress', !isNotAddress ? 'true' : 'false');
          if (isNotAddress) {
            this.showAddressWarning();
          }
        });
    }
  }

  showAddressWarning() {
    this.toast.warning(`You do not have an address.<br>Please add it in 'Profile Settings' to unlock ordering`);
  }
}
