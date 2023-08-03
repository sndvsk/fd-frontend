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

  refreshOnInit() {
    this.authenticationService
      .getUserRole()
      .pipe(handleError(this.toast))
      .subscribe((role) => {
        this.userRole = role as Roles;
      });
  }
}
