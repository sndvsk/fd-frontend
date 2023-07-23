import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  errorMessage: any;

  constructor(private authenticationService: AuthenticationService, public router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.authenticationService.login(this.loginForm.get('username')!.value, this.loginForm!.get('password')!.value).subscribe({
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
