import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerClient } from '../../clients/user-items/owner.client';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  constructor(private client: OwnerClient, private router: Router) {}
}
