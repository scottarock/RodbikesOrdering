export class Item {

  _id: string;
  description: string;
  quantity: string;
  requestedBy: string;
  department: string;
  specialOrder: string = 'No';
  customer: string;
  vendorName: string;
  partNumber: string;
  cost: string;
  price: string;
  shipping: string;
  status: string = 'Wanted';
  requestedOn: Date;
  orderedOn: Date;

  constructor() { }

  extendedCost(): number {
    return (this.cost && this.quantity)
      ? parseFloat(this.cost) * parseFloat(this.quantity)
      : null;
  }

  costWithShipping(): number {
    return (this.cost && this.shipping)
      ? parseFloat(this.cost) + parseFloat(this.shipping)
      : null;
  }

  code(): number {
    return this.costWithShipping()
      ? Math.round(this.costWithShipping() * 53)
      : null;
  }

}
