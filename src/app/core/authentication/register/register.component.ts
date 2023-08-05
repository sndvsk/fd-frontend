import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      telephone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^\\+?[1-9]\\d{1,15}$')]),
      role: new FormControl('', [Validators.required, roleValidator as any]),
    });
  }

  selectRole(role: string) {
    this.registerForm.get('role')!.setValue(role);
    this.showRegistrationForm = true;
  }

  public onSubmit() {
    const role = this.registerForm.get('role')!.value.toUpperCase(); // Convert role to uppercase
    this.authenticationService
      .register(
        this.registerForm.get('firstname')!.value,
        this.registerForm.get('lastname')!.value,
        this.registerForm.get('username')!.value,
        this.registerForm.get('email')!.value,
        this.registerForm.get('password')!.value,
        this.registerForm.get('telephone')!.value,
        role // Use the uppercase role value
      )
      .subscribe({
        next: () => {
          // Login successful, clear the error message
          this.errorMessage = '';
        },
        error: (error) => {
          // Login failed, set the error message
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = error.statusText;
          } else {
            this.errorMessage = 'An error occurred during login.';
          }
        },
        complete: () => {
          this.errorMessage = '';
        },
      });
  }
}
