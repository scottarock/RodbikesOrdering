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
  specialOrder: string = 'No';
  customer: string;
  status: string;

  constructor() { }

}
