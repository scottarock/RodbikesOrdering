import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { Order, Item } from '../../models';
import { OrderService, ItemService } from '../../services';

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
  // flag to determine when to show the new order details
  showOrder: boolean = false;

  constructor(
    private orderService: OrderService,
    private itemService: ItemService,
  ) { }

  ngOnInit() {
    // get the list of vendors that have items on the want list
    const query = {
      status: 'Wanted',
      sort: 'vendorName',
      fields: 'vendorName',
    };
    this.itemService.getItems(query)
      .subscribe(
        items => {
          // turn the array into a set of just the vendor names
          this.vendorList = new Set(items.map( item => item.vendorName ));
        },
        error => {
          console.log(error);
        }
      )
  }

  onStartOrder() {
    // set up the queries to retrieve data for the new order
    const poNumberQuery = {
      sort: '-poNumber',
      limit: 1,
      fields: 'poNumber',
    };
    const itemQuery = {
      status: 'Wanted',
      vendorName: this.vendorName,
    };

    // assign vendor name for a valid order
    this.order.vendorName = this.vendorName;
    this.order.dateOrdered = new Date();

    forkJoin(
      // figure out the po number and create order
      this.orderService.getOrders(poNumberQuery)
        .pipe(
          mergeMap( orders => {
            if ( orders.length ) {
              this.order.poNumber = orders[0].poNumber + 1;
            } else {
              this.order.poNumber = 100;
            }
            return this.orderService.createOrder(this.order);
          })
        ),
      // get the items for the order
      this.itemService.getItems(itemQuery),
    )
      .subscribe(
        // take the results and set up order for detail component
        results => {
          let [ order, items ] = results;
          const itemList: Item[] = [];

          // turn generic items into Item objects
          items.map(item => {
            itemList.push(Object.assign(new Item(), item));
          });

          this.order = order;
          this.order.items = itemList;
        },
        error => {
          console.log('error caught', error);
        }
      );

    // show the order details
    this.showOrder = true;
  }

}
