import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products:product[],term:string): product[] {
    return products.filter((item)=>item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
  }

}
