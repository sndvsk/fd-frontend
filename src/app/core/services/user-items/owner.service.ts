import { Injectable } from '@angular/core';
import { AdminClient } from '../../clients/user-items/admin.client';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/user-items/admin';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, tap } from 'rxjs';
import { OwnerClient } from '../../clients/user-items/owner.client';
import { Owner } from 'src/app/models/user-items/owner';

@Injectable({
	providedIn: 'root',
})
export class OwnerService {
	constructor(private client: OwnerClient, private router: Router) {}
}
