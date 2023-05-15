import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueNamesPipe'
})
export class UniqueNamesPipePipe implements PipeTransform {

  transform(items: any[], fieldName: string): any[] {
    if (!items) { return []; }
    
    const uniqueNames = [...new Set(items.map(item => item[fieldName]))];
    return uniqueNames.map(name => items.find(item => item[fieldName] === name));
  }

}
