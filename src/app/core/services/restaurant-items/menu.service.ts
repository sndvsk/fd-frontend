import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Item } from 'src/app/models/restaurant-items/item';
import { Menu } from 'src/app/models/restaurant-items/menu';
import { MenuClient } from '../../clients/restaurant-items/menu.client';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private errorHandler: ErrorHandlerService, private menuClient: MenuClient) {}

  getAllMenus(): Observable<Menu[]> {
    return this.menuClient.getAllMenus().pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log('All menus fetched.');
      })
    );
  }

  getMenusByOwnerId(ownerId: number): Observable<Menu[]> {
    return this.menuClient.getMenusByOwnerId(ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Menus of owner: ${ownerId} fetched.`);
      })
    );
  }

  getMenusOfRestaurant(restaurantId: number): Observable<Menu[]> {
    return this.menuClient.getMenusOfRestaurant(restaurantId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Menus of ${restaurantId} fetched.`);
      })
    );
  }

  getMenu(menuId: number): Observable<Menu> {
    return this.menuClient.getMenu(menuId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log(`Menu ${menuId} fetched.`);
      })
    );
  }

  addMenu(ownerId: number, menuName: string): Observable<Menu> {
    return this.menuClient.addMenu(ownerId, menuName).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log('Menu added.');
      })
    );
  }

  addItemToMenu(menuId: number, restaurantId: number, itemId: number, ownerId: number): Observable<Item> {
    return this.menuClient.addItemToMenu(menuId, restaurantId, itemId, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log('Item added to menu.');
      })
    );
  }

  addMenuToRestaurant(restaurantId: number, menuId: number, ownerId: number): Observable<Menu> {
    return this.menuClient.addMenuToRestaurant(restaurantId, menuId, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log('Menu added to restaurant.');
      })
    );
  }

  toggleMenuVisibility(menuId: number, ownerId: number): Observable<Menu> {
    return this.menuClient.toggleMenuVisibility(menuId, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        const visibility = response.visibility === 'true';
        if (visibility) {
          console.log('Menu is now visible.');
        } else {
          console.log('Menu is now not visible.');
        }
      })
    );
  }

  patchMenu(menuId: number, menuName: string, ownerId: number): Observable<Menu> {
    return this.menuClient.patchMenu(menuId, menuName, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap(() => {
        console.log('Menu is patched.');
      })
    );
  }

  deleteMenuFromRestaurant(menuId: number, restaurantId: number, ownerId: number): Observable<string> {
    return this.menuClient.deleteMenuFromRestaurant(menuId, restaurantId, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }

  deleteMenu(menuId: number, ownerId: number): Observable<string> {
    return this.menuClient.deleteMenu(menuId, ownerId).pipe(
      catchError(this.errorHandler.handleError),
      tap((response) => {
        console.log(response);
      })
    );
  }
}
