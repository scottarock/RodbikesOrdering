import { ItemService } from './item.service';
import { VendorService } from './vendor.service';
import { OrderService } from './order.service';
import { DialogService } from './dialog.service';

export const services: any[] = [
  ItemService,
  VendorService,
  OrderService,
  DialogService
];

export * from './item.service';
export * from './vendor.service';
export * from './order.service';
export * from './dialog.service';
