import { ItemService } from './item.service';
import { VendorService } from './vendor.service';
import { OrderService } from './order.service';

export const services: any[] = [
  ItemService,
  VendorService,
  OrderService
];

export * from './item.service';
export * from './vendor.service';
export * from './order.service';
