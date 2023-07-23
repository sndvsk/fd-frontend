import { Injectable } from '@angular/core';
import { AdminClient } from '../../clients/user-items/admin.client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private client: AdminClient, private router: Router) {}
}
