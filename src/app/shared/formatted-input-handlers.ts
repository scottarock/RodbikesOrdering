import { Item, Order } from '../models';

export function changeCurrencyInput(
  input: any,
  currencyObject: (Item | Order)): void
    {
      let newValue = input.value;
      if (newValue[0] === '$') {
        newValue = newValue.slice(1);
      }
      currencyObject[input.name] = parseFloat(newValue);
    };

export function changeDateInput(
  input: any,
  dateObject: (Item | Order)): void
    {
      let newDate = input.value;
      dateObject[input.name] = new Date(newDate);
    };
