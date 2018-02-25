import { Pipe, PipeTransform } from '@angular/core';
import Vehicles from './transport/vehicles.model';

@Pipe({
  name: 'transportFilter',
  pure: false
})
export class TransportFilterPipe implements PipeTransform {
  transform(items: Vehicles[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    // tslint:disable-next-line:max-line-length
    return items.filter(item => item.type.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      || item.color.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      || item.engine.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      || item.price.toString().toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
      || item.weight.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}
