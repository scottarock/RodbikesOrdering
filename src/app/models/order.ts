import { Item } from './item';

export class Order {

  _id: string;
  poNumber: number;
  vendorName: string;
  dateOrdered: Date;
  orderNumber: string;
  shippingCost: number;
  notes: string;
  items: Item[];

  constructor() { }

}
