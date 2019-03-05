import { Component, OnInit } from '@angular/core';

import { Order, Item } from '../../models';
import { ItemService } from '../../services';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {

  // the new order to place
  order: Order = new Order();
  // the list of vendor names that have items on the want list
  vendorList: Set<string>;
  // the name of the vendor to order from
  vendorName: string = "";
  // flag to determine when to show the order
  showOrder: boolean = false;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    // get the list of vendors that have items on the want list
    this.itemService.getItems({ status: 'Wanted' })
      .subscribe(
        items => {
          // sort items by vendor names
          items.sort((a,b) => {
            let aVendorName = a.vendorName.toLowerCase();
            let bVendorName = b.vendorName.toLowerCase();
            if ( aVendorName < bVendorName ) {
              return -1;
            }
            if ( aVendorName > bVendorName ) {
              return 1;
            }
            return 0;
          });
          // turn the array into a set of just the vendor names
          this.vendorList = new Set(items.map( item => item.vendorName ));
        },
        error => {
          console.log(error);
        }
      )
  }

  onStartOrder() {
    // retrieve all the items that are marked as wanted for the chosen vendor
    this.itemService.getItems({ status: 'Wanted', vendorName: this.vendorName })
      .subscribe(
        items => {
          const itemList = [];
          // change all the generic Object items into actual Item objects
          items.map(item => {
            let newItem = new Item;
            itemList.push(Object.assign(newItem, item));
          });
          // assign the vendor and items to the new order and show ordering form
          this.order.vendorName = this.vendorName;
          this.order.items = itemList;
          this.showOrder = true;
        },
        error => {
          console.log(error);
        }
      )
  }

}
