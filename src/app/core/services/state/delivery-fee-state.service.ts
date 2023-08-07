import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeliveryFeeStateService {
  private cache: Map<string, number> = new Map();

  setFee(restaurantId: string, vehicleType: string, fee: number) {
    this.cache.set(`${restaurantId}_${vehicleType}`, fee);
  }

  getFee(restaurantId: string, vehicleType: string): number | null {
    return this.cache.get(`${restaurantId}_${vehicleType}`) || null;
  }

  clear() {
    this.cache.clear();
  }
}
