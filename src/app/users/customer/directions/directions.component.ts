import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, catchError, map } from 'rxjs';
import { handleError } from 'src/app/core/handlers/error-toast';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { DirectionsService } from 'src/app/core/services/directions/directions.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';
import { RestaurantService } from 'src/app/core/services/restaurant-items/restaurant.service';
import { CartStateService } from 'src/app/core/services/state/cart-state.service';
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
  @ViewChild(MapInfoWindow, { static: false }) infoWindow?: MapInfoWindow;
  markerPositions: google.maps.LatLngLiteral[] = [];
  directions?: GoogleDirectionResponse;
  directionsResults$?: Observable<google.maps.DirectionsResult | undefined>;
  apiLoaded: Observable<boolean>;
  restaurantId?: number | null | undefined;
  customerId?: number;
  customerAddress?: Address;
  restaurantAddress?: Address;
  markers?: any[];
  zoom = 4;
  infoContent = '';
  totalDuration = '';
  deliveryCountdown? = '';
  vehicleType = '';

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService,
    private authenticationService: AuthenticationService,
    private customerService: CustomerService,
    private toast: HotToastService,
    private restaurantService: RestaurantService,
    private directionsService: DirectionsService,
    private mapDirectionsService: MapDirectionsService,
    private route: ActivatedRoute,
    private cartStateService: CartStateService
  ) {
    const apiKey = environment.googleMapsApiKey;
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`, 'callback').pipe(
      map(() => true),
      catchError(this.errorHandler.handleError)
    );
  }

  ngOnInit(): void {
    //this.loadScript();

    this.route.queryParams.subscribe((params) => {
      this.restaurantId = Number(params['restaurantId']);
      this.vehicleType = params['vehicleType'];
    });

    this.customerId = Number(this.authenticationService.getUserId());

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
            this.cartStateService.clearRestaurantIdState();
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

        const origin = this.directions.routes[0].bounds.southwest;
        const destination = this.directions.routes[0].bounds.northeast;

        const request: google.maps.DirectionsRequest = {
          destination: { lat: destination.lat, lng: destination.lng },
          origin: { lat: origin.lat, lng: origin.lng },
          travelMode: google.maps.TravelMode.WALKING,
        };

        this.directionsResults$ = this.mapDirectionsService.route(request).pipe(
          handleError(this.toast),
          map((response) => response.result)
        );

        this.markerPositions = [
          { lat: origin.lat, lng: origin.lng },
          { lat: destination.lat, lng: destination.lng },
        ];

        this.getTime();
      });
  }

  getTime() {
    let totalSeconds = 0;
    for (const leg of this.directions!.routes[0].legs) {
      totalSeconds += leg.duration.value;
    }

    if (this.vehicleType.toLocaleLowerCase() === 'bike') {
      totalSeconds = totalSeconds * 2;
    } else if (this.vehicleType.toLocaleLowerCase() === 'scooter') {
      totalSeconds = totalSeconds * 1.5;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    this.totalDuration = hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;

    // convert totalSeconds to milliseconds and start countdown
    this.startCountdown(totalSeconds * 1000);
  }

  startCountdown(milliseconds: number) {
    const interval = setInterval(() => {
      milliseconds -= 1000;
      const hours = Math.floor(milliseconds / 1000 / 3600);
      const minutes = Math.floor(milliseconds / 1000 / 60) % 60;
      const seconds = Math.floor(milliseconds / 1000) % 60;
      this.deliveryCountdown = `${hours}h ${minutes}m ${seconds}s`;

      if (milliseconds <= 0) {
        clearInterval(interval);
        // trigger order delivery event here
        console.log('Order delivered!');
      }
    }, 1000);
  }

  openInfoWindow(marker: MapMarker) {
    this.infoContent = `Latitude: ${marker.getPosition()?.lat}, Longitude: ${marker.getPosition()?.lng()}`;
    this.infoWindow?.open(marker);
  }

  /*   loadScript() {
    const node = document.createElement('script');
    node.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=visualization`;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  } */
}
