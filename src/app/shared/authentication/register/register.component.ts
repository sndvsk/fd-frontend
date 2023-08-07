import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { handleError } from '../../../core/handlers/error-toast';
import { HotToastService } from '@ngneat/hot-toast';
import { CustomValidators } from 'src/app/core/utils/custom-validators';

function roleValidator(control: AbstractControl): ValidationErrors | null {
  const validRoles = ['owner', 'customer'];
  if (validRoles.indexOf(control.value) === -1) {
    return { invalidRole: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public showRegistrationForm = false;

  errorMessage: any;

  constructor(private authenticationService: AuthenticationService, private toast: HotToastService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
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
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        CustomValidators.customTelephone,
      ]),
      role: new FormControl('', [Validators.required, roleValidator as any]),
    });
  }

  selectRole(role: string) {
    this.registerForm.get('role')!.setValue(role);
    this.showRegistrationForm = true;
  }

  public onSubmit() {
    const role = this.registerForm.get('role')!.value.toUpperCase();
    this.authenticationService
      .register(
        this.registerForm.get('firstname')!.value,
        this.registerForm.get('lastname')!.value,
        this.registerForm.get('username')!.value,
        this.registerForm.get('email')!.value,
        this.registerForm.get('password')!.value,
        this.registerForm.get('telephone')!.value,
        role
      )
      .pipe(handleError(this.toast))
      .subscribe({
        next: () => {
          // Register successful, clear the error message
          this.errorMessage = '';
        },
        error: (error) => {
          // Register failed, set the error message
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = error.statusText;
          } else {
            this.errorMessage = 'An error occurred during register.';
          }
        },
        complete: () => {
          this.errorMessage = '';
        },
      });
  }
}
