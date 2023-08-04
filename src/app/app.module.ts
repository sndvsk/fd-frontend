import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { RoutingGuard } from './core/guards/routing.guard';
import { FormsModule } from '@angular/forms';
import { UsersModule } from './users/users.module';
import { CustomErrorHandler } from './core/handlers/error.handler';
import { HotToastModule } from '@ngneat/hot-toast';
import { CheckoutNavigationGuard } from './core/guards/checkout-navigation.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UsersModule,
    NgbModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    HotToastModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationGuard,
    RoutingGuard,
    CheckoutNavigationGuard,
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    // ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
