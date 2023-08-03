import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { handleError } from 'src/app/core/handlers/error-toast';
import { AdminService } from 'src/app/core/services/user-items/admin.service';
import { normalizeArray } from 'src/app/core/utils/utils';
import { Owner } from 'src/app/models/user-items/owner';

@Component({
  selector: 'app-display-owners',
  templateUrl: './display-owners.component.html',
  styleUrls: ['./display-owners.component.scss'],
})
export class DisplayOwnersComponent implements OnInit {
  displayedColumns: string[] = ['owner_id', 'username', 'restaurants', 'actions'];
  dataSource!: MatTableDataSource<Owner>;
  owners?: Owner[];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private adminService: AdminService, private toast: HotToastService) {}

  ngOnInit() {
    this.adminService
      .getOwners()
      .pipe(handleError(this.toast))
      .subscribe((owners) => {
        this.dataSource = new MatTableDataSource(normalizeArray(owners));
        this.dataSource.sort = this.sort;

        this.dataSource.sortingDataAccessor = (item: any, property) => {
          switch (property) {
            case 'username':
              return item.user.username;
            default:
              return item[property];
          }
        };

        this.owners = normalizeArray(owners);
      });
  }

  openOwnerPanel(owner: Owner) {
    if (owner && owner.owner_id) {
      localStorage.setItem('admin_view_owner_id', owner.owner_id.toString());
      this.router.navigate(['owner/panel']);
    }
  }
}
