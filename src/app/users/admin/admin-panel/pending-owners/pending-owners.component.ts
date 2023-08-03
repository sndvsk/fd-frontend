import { Component, OnDestroy, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs';
import { handleError } from 'src/app/core/handlers/error-toast';
import { AdminService } from 'src/app/core/services/user-items/admin.service';
import { UsersService } from 'src/app/core/services/user-items/users.service';
import { normalizeArray } from 'src/app/core/utils/utils';
import { Owner } from 'src/app/models/user-items/owner';

@Component({
  selector: 'app-pending-owners',
  templateUrl: './pending-owners.component.html',
  styleUrls: ['./pending-owners.component.scss'],
})
export class PendingOwnersComponent implements OnInit, OnDestroy {
  owners!: Owner[];
  private destroy$ = new Subject<void>();

  constructor(private adminService: AdminService, private userService: UsersService, private toast: HotToastService) {}

  ngOnInit() {
    this.adminService
      .getOwnersWithApprovalStatusFalse()
      .pipe(handleError(this.toast))
      .subscribe((owners) => {
        this.owners = normalizeArray(owners);
      });
  }

  approveOwner(ownerId: number) {
    this.adminService
      .approveOwner(ownerId)
      .pipe(handleError(this.toast))
      .subscribe(() => {
        this.owners = this.owners.filter((owner) => owner.owner_id !== ownerId);
      });
  }

  rejectOwner(ownerId: number) {
    this.adminService
      .rejectOwner(ownerId)
      .pipe(handleError(this.toast))
      .subscribe(() => {
        this.owners = this.owners.filter((owner) => owner.owner_id !== ownerId);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
