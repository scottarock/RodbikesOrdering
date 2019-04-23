import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceCode'
})
export class PriceCodePipe implements PipeTransform {

  // pipe to format the price code as 6 numbers long with leading 0s as needed

  transform(value: number): string {
    let priceCode: string = null
    if ( value ) {
      priceCode = value.toString();
      while ( priceCode.length  < 6 ) {
        priceCode = '0' + priceCode;
      }
    }
    return priceCode;
  }

}
