import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, catchError, map } from 'rxjs';
import { handleError } from 'src/app/core/handlers/error-toast';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { DirectionsService } from 'src/app/core/services/directions/directions.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { CustomerService } from 'src/app/core/services/user-items/customer.service';
import { GoogleDirectionResponse } from 'src/app/models/directions/directions';
import { Address } from 'src/app/models/user-items/address';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss'],
})
export class DirectionsComponent implements OnInit {
  directions?: GoogleDirectionResponse;
  directionsResults$?: Observable<google.maps.DirectionsResult | undefined>;
  apiLoaded: Observable<boolean>;
  restaurantId?: number | null | undefined;
  customerId?: number;
  customerAddress?: Address;
  restaurantAddress?: Address;
  markers?: any[];

  ngOnInit(): void {
    this.markers!.push({
      position: {
        lat: 40.4381311,
        lng: -3.8196233,
      },
      label: {
        color: 'black',
        text: 'Madrid',
      },
    });

    this.markers!.push({
      position: {
        lat: 48.8615515,
        lng: 2.3112233,
      },
      label: {
        color: 'black',
        text: 'Paris',
      },
    });

    this.customerId = Number(this.authenticationService.getUserId());
    this.restaurantId = Number(localStorage.getItem('restaurantId')) || 1;

    if (this.customerId && this.restaurantId) {
      this.customerService
        .getAddress(+this.customerId)
        .pipe(handleError(this.toast))
        .subscribe((address) => {
          if (Object.keys(address).length !== 0) {
            this.customerAddress = address;
          }
        });

      this.restaurantService
        .getRestaurant(this.restaurantId)
        .pipe(handleError(this.toast))
        .subscribe((restaurant) => {
          this.restaurantAddress = restaurant.address;

          if (this.customerAddress && this.restaurantAddress) {
            this.getDirections([this.customerAddress, this.restaurantAddress]);
          }
        });
    }
  }

  getDirections(addresses: Address[]) {
    this.directionsService
      .getDirections(addresses)
      .pipe(handleError(this.toast))
      .subscribe((directionsResponse) => {
        this.directions = directionsResponse;
      });
  }

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService,
    private authenticationService: AuthenticationService,
    private customerService: CustomerService,
    private toast: HotToastService,
    private restaurantService: RestaurantService,
    private directionsService: DirectionsService,
    private mapDirectionsService: MapDirectionsService
  ) {
    const apiKey = environment.googleMapsApiKey;
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`, 'callback').pipe(
      map(() => true),
      catchError(this.errorHandler.handleError)
    );
  }

  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  display?: google.maps.LatLngLiteral;

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = event!.latLng!.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event!.latLng!.toJSON();
  }
}
