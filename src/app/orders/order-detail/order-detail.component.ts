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

  @Input() order: Order;
  @Output() orderCompleted = new EventEmitter<Order>();
  @Output() orderCancelled = new EventEmitter<Order>();
  @Output() itemModified = new EventEmitter<Item>();
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

  cancelOrder() {
    this.orderCancelled.emit(this.order);
  }

  saveItem() {
    console.log("Save the item now!")
  }

  onDateChange(input: any, dateObject: Order): void {
    changeDateInput(input, dateObject);
  };

  onCurrencyChange(input: any, currencyObject: Item | Order): void {
    changeCurrencyInput(input, currencyObject);
    if ( currencyObject instanceof Item ) {
      this.itemModified.emit(currencyObject as Item);
    }
  }

  onSaveItem(item: Item): void {
    this.itemModified.emit(item);
  }

}
