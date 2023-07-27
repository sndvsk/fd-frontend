import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/core/services/user-items/admin.service';
import { UsersService } from 'src/app/core/services/user-items/users.service';
import { Owner } from 'src/app/models/user-items/owner';

@Component({
  selector: 'app-pending-owners',
  templateUrl: './pending-owners.component.html',
  styleUrls: ['./pending-owners.component.scss'],
})
export class PendingOwnersComponent implements OnInit, OnDestroy {
  owners!: Owner[];
  private destroy$ = new Subject<void>();

  constructor(private adminService: AdminService, private userService: UsersService) {}

  ngOnInit() {
    this.adminService.getOwnersWithApprovalStatusFalse().subscribe((owners) => {
      this.owners = owners;
    });
  }

  approveOwner(ownerId: number) {
    this.adminService.approveOwner(ownerId).subscribe(() => {
      this.owners = this.owners.filter((owner) => owner.owner_id !== ownerId);
    });
  }

  rejectOwner(ownerId: number) {
    this.adminService.rejectOwner(ownerId).subscribe(() => {
      this.owners = this.owners.filter((owner) => owner.owner_id !== ownerId);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
