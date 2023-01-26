import { Pipe, PipeTransform } from '@angular/core';
import { Result } from 'express-validator';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string) {
    if (!value || filterString === '' || propName === '')
     {
      return value;
  }
    const proData: any = [];
    value.forEach((a: any) => {
      if (a[propName].trim().toLowerCase().includes(filterString.toLowerCase()))
      {
        proData.push(a);
       }
    
    });
    return proData;
  }
}