import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Order, Vendor } from '../../models';
import { OrderService, VendorService } from '../../services';

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
    private router: Router
  ) { }

  ngOnInit() {
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
      )
  }

  onOrderComplete() {
    console.log('Completed Order', this.order);
    // TODO: NEED TO ADD THE PO NUMBER BEFORE SAVING
    // this.orderService.createOrder(this.order)
    //   .subscribe(
    //     order => {
    //       this.order = order;
    //       this.router.navigateByUrl('/');
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
  }

}
