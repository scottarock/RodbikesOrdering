import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Order, Vendor, Item } from '../../models';
import { OrderService, VendorService, ItemService } from '../../services';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @Input() order: Order;
  vendor: Vendor = new Vendor;

  constructor(
    private orderService: OrderService,
    private vendorService: VendorService,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.order.dateOrdered.toDateString());
    // retrieve the actual vendor for the order
    const query = {
      name: this.order.vendorName,
    };
    this.vendorService.getVendors(query)
      .subscribe(
        vendors => {
          vendors.forEach(vendor => {
            // name is unique, so this should return a single vendor
            if ( this.order.vendorName === vendor.name ) {
              Object.assign(this.vendor, vendor);
            }
          })
        },
        error => {
          console.log(error);
        }
      );
  }

  onOrderComplete() {
    console.log('Completed Order', this.order);
    this.order.items.forEach( item => {
      item.status = 'Ordered';
      item.poNumber = this.order.poNumber;
      item.orderedOn = new Date();
    });
    this.orderService.updateOrder(this.order)
      .subscribe(
        () => {
          this.router.navigateByUrl('/items');
        },
        error => {
          console.log(error);
        }
      );
  }

}
