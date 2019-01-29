export class Item {

  _id: string;
  description: string;
  quantity: number = 1;
  requestedBy: string;
  department: string;
  specialOrder: string = 'No';
  customer: string;
  vendorName: string;
  partNumber: string;
  cost: number;
  price: number;
  shipping: number = 0;
  status: string = 'Wanted';
  requestedOn: Date;
  orderedOn: Date;

  constructor() { }

  extendedCost(): number {
    return (this.isValid(this.cost) && this.isValid(this.quantity))
      ? this.cost * this.quantity
      : null;
  }

  costWithShipping(): number {
    return (this.isValid(this.cost) && this.isValid(this.shipping))
      ? this.cost + this.shipping
      : null;
  }

  code(): number {
    return this.costWithShipping()
      ? Math.round(this.costWithShipping() * 53)
      : null;
  }

  private isValid(aNumber: number): boolean {
    return aNumber !== undefined && aNumber !== null;
  }

}
