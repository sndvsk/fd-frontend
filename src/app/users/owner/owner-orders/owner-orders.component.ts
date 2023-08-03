import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-owner-orders',
  templateUrl: './owner-orders.component.html',
  styleUrls: ['./owner-orders.component.scss'],
})
export class OwnerOrdersComponent {
  constructor(private toast: HotToastService) {}
}
