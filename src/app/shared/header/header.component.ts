import { NgIfContext } from '@angular/common';
import { Component, ElementRef, HostListener, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Roles } from 'src/app/models/user-items/roles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navBurger') navBurger: ElementRef | undefined;

  public navbarShow = false;
  public showDropdown = false;
  public isSmallScreen = false;

  public userRole: Roles | undefined | string;
  public username: string | null;

  signInOptions!: TemplateRef<NgIfContext<boolean>> | null;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private ngZone: NgZone,
    private toast: HotToastService
  ) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
    this.refreshOnInit();

    this.isSmallScreen = window.innerWidth < 768;
    if (this.isSmallScreen) {
      this.showDropdown = true;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.refreshOnInit();
        if (!this.isSmallScreen) {
          this.showDropdown = false; // set to false instead of toggling
        }
      }
    });
  }

  refreshOnInit() {
    this.authenticationService
      .getUserRole()
      .pipe(handleError(this.toast))
      .subscribe((role) => {
        this.userRole = role as Roles;
      });
    this.authenticationService.getLoggedInName.pipe(handleError(this.toast)).subscribe((username) => {
      this.username = username;
      localStorage.setItem('username', username);
    });
  }

  toggleNavbar() {
    this.navbarShow = !this.navbarShow;
  }

  closeNavbar() {
    if (this.isSmallScreen) {
      this.navbarShow = false;
    }
  }

  toggleDropdown() {
    if (!this.isSmallScreen) {
      this.showDropdown = !this.showDropdown;
    }
  }

  hideDropdown() {
    this.showDropdown = false;
  }

  logout() {
    this.username = ''; // Reset the username immediately
    this.authenticationService.logout();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.ngZone.run(() => {
      this.isSmallScreen = (event.target as Window).innerWidth < 768;
      if (this.isSmallScreen) {
        this.showDropdown = true;
      }
    });
  }

  closeNavbarOnLinkClick(event: Event) {
    if (this.isSmallScreen && event.target instanceof HTMLElement && event.target.tagName.toLowerCase() === 'a') {
      this.navbarShow = false;
    }
  }
}
