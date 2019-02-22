import { Component, OnInit } from '@angular/core';

import { Order, Item } from '../../models';
import { OrderService, ItemService } from '../../services';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {

  // the new order to place
  newOrder: Order = new Order();
  // the list of vendor names that have items on the want list
  vendorList: Set<string>;
  // the name of the vendor to order from
  vendorName: string = "";
  // flag to determine when to show the order
  showOrder: boolean = false;

  constructor(
    private orderService: OrderService,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    // get the list of vendors that have items on the want list
    this.itemService.getItems({ status: 'Wanted' })
      .subscribe(
        items => {
          this.vendorList = new Set(items.map( item => item.vendorName ));
        },
        error => {
          console.log(error);
        }
      )
  }

  onStartOrder() {
    this.itemService.getItems({ status: 'Wanted', vendorName: this.vendorName })
      .subscribe(
        items => {
          const itemList = [];
          items.map(item => {
            let newItem = new Item;
            itemList.push(Object.assign(newItem, item));
          });
          this.newOrder.items = itemList;
          this.newOrder.vendorName = this.vendorName;
          this.showOrder = true;
        },
        error => {
          console.log(error);
        }
      )
  }

}
