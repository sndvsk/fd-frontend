import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RoutingGuard } from './guards/routing.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule],
  exports: [],
  providers: [AuthenticationGuard, RoutingGuard],
})
export class CoreModule {}
