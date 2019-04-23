import { Item, Order } from '../models';

// Service to allow for string formatting of currency and date properties
// in forms. These methods convert the values and set the properties appropriately

// input is a form input from an html page
// currencyObject is the Object that has a number property that is a currency
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

// input is a form input from an html page
// dateObject is the Object that has a Date property
export function changeDateInput(
  input: any,
  dateObject: (Item | Order)): void
    {
      let newDate = input.value;
      dateObject[input.name] = new Date(newDate);
    };
