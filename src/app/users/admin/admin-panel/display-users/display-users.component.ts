import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/core/services/user-items/users.service';
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

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
