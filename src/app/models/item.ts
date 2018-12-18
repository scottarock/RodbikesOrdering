export class Item {

  _id: string;
  description: string;
  quantity: number;
  requestedBy: string;
  department: string;
  vendor: string;
  partNumber: string;
  cost: number;
  price: number;
  shipping: number = 0;
  specialOrder: string = 'No';
  customer: string;
  status: string = 'Wanted';
  requestedOn: Date;
  orderedOn: Date;

  constructor() { }

  code(): number {
    return this.costWithShipping() * .00053;
  }

  extendedCost(): number {
    return this.cost * this.quantity;
  }

  costWithShipping(): number {
    return this.cost + this.shipping;
  }

}
