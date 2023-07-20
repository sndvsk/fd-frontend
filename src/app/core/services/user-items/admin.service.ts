import { Injectable } from '@angular/core';
import { AdminClient } from '../../clients/user-items/admin.client';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/user-items/admin';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	constructor(private client: AdminClient, private router: Router) {}
}
