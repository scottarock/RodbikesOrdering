import { Component, OnInit } from '@angular/core';

import { Order, Item } from '../../models';
import { OrderService, ItemService } from '../../services';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {

  vendorList: Set<string>;
  vendorName: string = "";
  order: Order = new Order();

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
    this.itemService.getItems({ poNumber: 0, vendorName: this.vendorName })
      .subscribe(
        items => {
          const itemList = [];
          items.map(item => {
            let newItem = new Item;
            itemList.push(Object.assign(newItem, item));
          });
          this.order.items = itemList;
          this.order.vendorName = this.vendorName;
        },
        error => {
          console.log(error);
        }
      )
  }

}
