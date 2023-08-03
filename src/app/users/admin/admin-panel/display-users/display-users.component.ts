import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs';
import { handleError } from 'src/app/core/handlers/error-toast';
import { UsersService } from 'src/app/core/services/user-items/users.service';
import { normalizeArray } from 'src/app/core/utils/utils';
import { User } from 'src/app/models/user-items/user';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss'],
})
export class DisplayUsersComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<User>;
  private destroy$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService, private toast: HotToastService) {}

  ngOnInit() {
    this.userService
      .getAllUsers()
      .pipe(handleError(this.toast))
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(normalizeArray(users));
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
