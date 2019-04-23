import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Order, Vendor, Item } from '../../models';
import { VendorService } from '../../services';
import { changeDateInput, changeCurrencyInput } from '../../shared/formatted-input-handlers';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  // the order to place
  @Input() order: Order;
  // event to let parent component know that the order is completed
  @Output() orderCompleted = new EventEmitter<Order>();
  // event to let parent component know that the order is cancelled
  @Output() orderCancelled = new EventEmitter<Order>();
  // event to let parent component know that the one of the items has been changed
  @Output() itemModified = new EventEmitter<Item>();
  // the vendor for the order
  vendor: Vendor = new Vendor;

  constructor(
    private vendorService: VendorService,
  ) { }

  ngOnInit() {
    // retrieve all the vendor information for the order
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

  completeOrder() {
    this.orderCompleted.emit(this.order);
  }

  pendOrder() {
    // TODO: pend an order
    console.log('gonna pend this order =>', this.order);
  }

  cancelOrder() {
    this.orderCancelled.emit(this.order);
  }

  onDateChange(input: any, dateObject: Order): void {
    // convert string to date and assign
    changeDateInput(input, dateObject);
  };

  onCurrencyChange(input: any, currencyObject: Item | Order): void {
    // convert string to number and assign
    changeCurrencyInput(input, currencyObject);
    // if it is an item, we should save change to database
    if ( currencyObject instanceof Item ) {
      this.itemModified.emit(currencyObject as Item);
    }
  }

  onSaveItem(item: Item): void {
    this.itemModified.emit(item);
  }

}
