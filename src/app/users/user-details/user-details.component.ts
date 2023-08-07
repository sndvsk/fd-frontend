import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { CustomerService } from 'src/app/core/services/user-items/customer.service';
import { UsersService } from 'src/app/core/services/user-items/users.service';
import { CustomValidators } from 'src/app/core/utils/custom-validators';
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
  public userForm!: FormGroup;
  public addressForm!: FormGroup;

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

  constructor(
    private authService: AuthenticationService,
    private userService: UsersService,
    private customerService: CustomerService,
    private toast: HotToastService
  ) {}

  ngOnInit() {
    this.initForms();

    this.authService.getLoggedInName.pipe(handleError(this.toast)).subscribe((username) => {
      this.username = username;
    });

    this.userService
      .getUser(this.username!)
      .pipe(handleError(this.toast))
      .subscribe((user) => {
        this.userForm!.patchValue(user);
        this.user = user;
        this.id = user.user_id;
      });

    if (this.userRole === Roles.CUSTOMER) {
      this.customerService
        .getAddress(+this.userId!)
        .pipe(handleError(this.toast))
        .subscribe((address) => {
          if (Object.keys(address).length !== 0) {
            this.addressForm!.patchValue(address);
            this.address = address;
            this.addressExists = true;
          }
        });
    }
  }

  initForms() {
    this.userForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        CustomValidators.unicodeLettersAndSpaces,
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        CustomValidators.unicodeLettersAndSpaces,
      ]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.email, CustomValidators.customEmail]),
      password: new FormControl('', [Validators.minLength(3), Validators.maxLength(255)]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255),
        CustomValidators.customTelephone,
      ]),
    });

    this.addressForm = new FormGroup({
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        CustomValidators.unicodeLettersAndSpaces,
      ]),
      county: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        CustomValidators.unicodeLettersAndSpaces,
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        CustomValidators.unicodeLettersAndSpaces,
      ]),
      zip_code: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        CustomValidators.customZipcode,
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        CustomValidators.unicodeLettersDigitsSpaces,
      ]),
      house_number: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
        CustomValidators.houseNumber,
      ]),
      apt_number: new FormControl('', [Validators.minLength(1), Validators.maxLength(255), CustomValidators.unicodeLettersDigits]),
    });
  }

  onUserSubmit() {
    // Only include fields that are not empty or undefined
    const formData = this.userForm.value;
    const customerToSend = Object.fromEntries(Object.entries(formData).filter(([value]) => value !== '' && value !== undefined)) as User;

    this.userService
      .updateUser(this.username!, customerToSend)
      .pipe(handleError(this.toast))
      .subscribe((response) => {
        this.toast.success('User details successfully updated!');
        const updatedUsername = customerToSend.username as string;
        this.authService.getLoggedInName.next(updatedUsername);
        localStorage.setItem('username', updatedUsername);
        this.user = response;
      });
  }

  onAddressSubmit() {
    // Only include fields that are not empty or undefined
    const formData = this.addressForm.value;
    const addressToSend = Object.fromEntries(Object.entries(formData).filter(([value]) => value !== '' && value !== undefined));

    if (this.addressExists) {
      // Update address
      this.customerService
        .updateAddress(+this.userId!, addressToSend)
        .pipe(handleError(this.toast))
        .subscribe(() => {
          this.toast.success('Address successfully updated!');
          this.address = addressToSend;
          this.editModeAddress = false;
        });
    } else {
      // Add address
      this.customerService
        .addAddress(+this.userId!, addressToSend)
        .pipe(handleError(this.toast))
        .subscribe(() => {
          this.toast.success('Address successfully set!');
          this.address = addressToSend;
          this.addressExists = true;
          this.editModeAddress = false;
        });
    }
  }

  setEditModeUser(value: boolean) {
    this.editModeUser = value;
    if (!this.editModeUser) {
      this.userForm.patchValue(this.user);
    }
  }

  setEditModeAddress(value: boolean) {
    this.editModeAddress = value;
    if (!this.editModeAddress) {
      this.addressForm.patchValue(this.address);
    }
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
