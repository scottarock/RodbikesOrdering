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
  specialOrder: boolean = false;
  customer: string;

  constructor() { }

}
