import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from 'src/app/core/handlers/error-toast';
import { OrderService } from 'src/app/core/services/restaurant-items/order.service';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { OwnerService } from 'src/app/core/services/user-items/owner.service';
import { normalizeArray } from 'src/app/core/utils/utils';
import { Order } from 'src/app/models/restaurant-items/order';
import { Restaurant } from 'src/app/models/restaurant-items/restaurant';

@Component({
  selector: 'app-owner-orders',
  templateUrl: './owner-orders.component.html',
  styleUrls: ['./owner-orders.component.scss'],
  providers: [DatePipe],
})
export class OwnerOrdersComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<Order>;
  ownerId?: number;
  restaurants?: Restaurant[];
  orders: Order[] = [];
  private destroy$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private restaurantService: RestaurantService,
    private toast: HotToastService,
    private ownerService: OwnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.ownerId = Number(userId);
    }

    if (this.ownerId) {
      this.restaurantService
        .getRestaurantsByOwnerId(this.ownerId)
        .pipe(catchError(handleError(this.toast)))
        .subscribe((restaurants) => {
          this.restaurants = normalizeArray(restaurants);
          this.restaurants.forEach((restaurant) => {
            if (restaurant.restaurant_id && this.ownerId) {
              this.orderService
                .getOrdersByRestaurant(restaurant.restaurant_id, this.ownerId)
                .pipe(catchError(handleError(this.toast)))
                .subscribe((orders: any) => {
                  orders.forEach((order: any) => {
                    const dateTransformed = this.datePipe.transform(order.datetime, 'dd/MM/yyyy, hh:mm');
                    if (dateTransformed) {
                      order.datetimeStr = dateTransformed;
                    }
                    order.datetime = new Date(order.datetime);
                  });

                  this.orders = [...this.orders, ...orders];
                  this.dataSource = new MatTableDataSource(this.orders);
                  this.dataSource.sortingDataAccessor = (item: Order, property: string) => {
                    switch (property) {
                      case 'date_time':
                        return item.datetime ? item.datetime : new Date(0);
                      case 'username':
                        return item.customer ? item.customer.username : '';
                      default:
                        return (item as any)[property];
                    }
                  };
                  this.dataSource.sort = this.sort;
                });
            }
          });
        });
    }
  }

  approveOrder(orderId: number) {
    if (this.ownerId) {
      this.ownerService
        .approveOrder(orderId, this.ownerId)
        .pipe(handleError(this.toast))
        .subscribe(() => {
          // Update the status of the order in this component
          const index = this.orders.findIndex((order) => order.order_id === orderId);
          if (index !== -1) {
            this.orders[index].status = 'ACCEPTED';
            this.dataSource = new MatTableDataSource(this.orders);
            this.dataSource.sort = this.sort;
          }
        });
    }
  }

  rejectOrder(orderId: number) {
    if (this.ownerId) {
      this.ownerService
        .rejectOrder(orderId, this.ownerId)
        .pipe(handleError(this.toast))
        .subscribe(() => {
          // Update the status of the order in this component
          const index = this.orders.findIndex((order) => order.order_id === orderId);
          if (index !== -1) {
            this.orders[index].status = 'CANCELLED';
            this.dataSource = new MatTableDataSource(this.orders);
            this.dataSource.sort = this.sort;
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
