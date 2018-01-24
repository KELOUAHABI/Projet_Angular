import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class BrandPipe implements PipeTransform {

  transform(phones: any, search: any): any {

    if (search === undefined) {
      return phones;
    } else {
      return phones.filter(function (phone) {
        return phone.name.toLowerCase().includes(search.toLowerCase());
      });
    }

  }
}
