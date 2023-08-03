import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs';
import { handleError } from 'src/app/core/handlers/error-toast';
import { OrderService } from 'src/app/core/services/restaurant-items/order.service';
import { normalizeArray } from 'src/app/core/utils/utils';
import { Order } from 'src/app/models/restaurant-items/order';

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.scss'],
})
export class DisplayOrdersComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<Order>;
  private destroy$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService, private toast: HotToastService) {}

  ngOnInit() {
    this.orderService
      .getAllOrders()
      .pipe(handleError(this.toast))
      .subscribe((orders) => {
        this.dataSource = new MatTableDataSource(normalizeArray(orders));
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
