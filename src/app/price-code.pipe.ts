import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceCode'
})
export class PriceCodePipe implements PipeTransform {

  transform(value: number): number {

    return null;
  }

}
