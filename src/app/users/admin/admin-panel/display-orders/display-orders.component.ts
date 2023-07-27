import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/core/services/restaurant-items/order.service';
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

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((orders) => {
      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
