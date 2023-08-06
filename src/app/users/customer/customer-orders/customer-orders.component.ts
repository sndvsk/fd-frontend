import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { OrderService } from 'src/app/core/services/restaurant-items/order.service';
import { Order } from 'src/app/models/restaurant-items/order';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss'],
  providers: [DatePipe],
})
export class CustomerOrdersComponent implements OnInit {
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();
  allColumns: string[] = [
    'order_id',
    'restaurant_name',
    'datetime', //'item_price', 'delivery_fee',
    'total_price',
    'status',
    'items',
  ];
  displayedColumns: string[] = this.allColumns;
  columnLabels: { [key: string]: string } = {
    order_id: 'Order ID',
    restaurant_name: 'Restaurant Name',
    datetime: 'Datetime',
    /*     item_price: 'Item Price',
    delivery_fee: 'Delivery Fee', */
    total_price: 'Total Price',
    status: 'Status',
    items: 'Items',
  };

  constructor(
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    const customerId = Number(this.authenticationService.getUserId());
    if (customerId) {
      this.orderService
        .getOrdersByCustomer(customerId)
        .pipe(
          catchError((error) => {
            this.toast.error(`Error.<br>Status: ${error.status}<br>Message: ${error.statusText}`);
            throw error;
          })
        )
        .subscribe((orders) => {
          orders.forEach((order) => {
            const dateTransformed = this.datePipe.transform(order.datetime, 'dd-MM-yyyy hh:mm:ss');
            if (dateTransformed) {
              order.datetime = dateTransformed;
            }
          });
          this.dataSource = new MatTableDataSource(orders);
          this.dataSource.sort = this.sort;
        });
    }
  }

  displayItems(items: any[]): string {
    return items.map((item) => `${item.item_name} (Quantity: ${item.quantity})`).join('<br>');
  }
}
