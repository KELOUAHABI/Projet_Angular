
import { Pipe, PipeTransform } from '@angular/core';

import { Phone } from '../models/phone';

@Pipe({
  name: 'pricePipe'
})
export class PricePipe implements PipeTransform {

  transform(phones: any, args?: any): any {
    let maxPrice = args;
    return phones.filter(phone => {
      return phone.price <= maxPrice;
    });
  }

}
