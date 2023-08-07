import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVisibleMenus',
})
export class FilterVisibleMenusPipe implements PipeTransform {
  transform(menus: any[], field: string, expectedValue: any): any[] {
    if (!menus || !field || expectedValue === undefined) return menus;

    return menus.filter((menu) => menu[field] === expectedValue);
  }
}
