import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CustomerService } from 'src/app/core/services/user-items/customer.service';
import { UsersService } from 'src/app/core/services/user-items/users.service';
import { Address } from 'src/app/models/user-items/address';
import { Roles } from 'src/app/models/user-items/roles';
import { User } from 'src/app/models/user-items/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public userId: string | null = this.authService.getUserId();
  public id: number | undefined;
  public username: string | null = localStorage.getItem('username');
  public userRole: string | null = localStorage.getItem('user_role');
  public addressExists = false;
  public editModeUser = false;
  public editModeAddress = false;
  public hidePassword = true;

  user: Partial<User> = {
    username: undefined,
    firstname: undefined,
    lastname: undefined,
    password: undefined,
    email: undefined,
    telephone: undefined,
  };

  address: Partial<Address> = {
    country: undefined,
    county: undefined,
    city: undefined,
    zip_code: undefined,
    street: undefined,
    house_number: undefined,
    apt_number: undefined,
  };

  constructor(private authService: AuthenticationService, private userService: UsersService, private customerService: CustomerService) {}

  ngOnInit() {
    this.authService.getLoggedInName.subscribe((username) => {
      this.username = username;
    });

    this.userService.getUser(this.username!).subscribe((user) => {
      this.user = user;
      this.id = user.user_id;
    });

    if (this.userRole === Roles.CUSTOMER) {
      this.customerService.getAddress(+this.userId!).subscribe((address) => {
        if (Object.keys(address).length !== 0) {
          this.address = address;
          this.addressExists = true;
        }
      });
    }
  }

  onUserSubmit() {
    // Only include fields that are not empty or undefined
    const customerToSend = Object.fromEntries(Object.entries(this.user).filter(([value]) => value !== '' && value !== undefined)) as User; // Add 'as User' to explicitly cast the object

    this.userService.updateUser(this.username!, customerToSend).subscribe((response) => {
      const updatedUsername = customerToSend.username as string; // Cast 'username' as string
      this.authService.getLoggedInName.next(updatedUsername);
      localStorage.setItem('username', updatedUsername);
      this.user = response;
    });
  }

  onAddressSubmit() {
    // Only include fields that are not empty or undefined
    const addressToSend = Object.fromEntries(Object.entries(this.address).filter(([value]) => value !== '' && value !== undefined));

    if (this.addressExists) {
      // Update address
      this.customerService.updateAddress(+this.userId!, addressToSend).subscribe(() => {
        this.address = addressToSend; // assign addressToSend to this.address
        location.reload();
      });
    } else {
      // Add address
      this.customerService.addAddress(+this.userId!, addressToSend).subscribe(() => {
        this.address = addressToSend; // assign addressToSend to this.address
        this.addressExists = true;
      });
    }
  }

  setEditModeUser(value: boolean) {
    this.editModeUser = value;
  }

  setEditModeAddress(value: boolean) {
    this.editModeAddress = value;
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
