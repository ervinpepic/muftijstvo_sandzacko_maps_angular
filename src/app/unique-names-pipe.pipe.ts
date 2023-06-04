import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueNamesPipe'
})
export class UniqueNamesPipe implements PipeTransform {
  transform(value: any[], field: string): any[] {
    if (!Array.isArray(value)) {
      return [];
    }

    const uniqueValues = value.reduce((acc: any[], item: any) => {
      if (!acc.find((i: any) => i[field] === item[field])) {
        acc.push(item);
      }
      return acc;
    }, []);

    return uniqueValues;
  }
}
