import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Order, Item } from '../../models';
import { OrderService, ItemService, DialogService } from '../../services';

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
  // flag to determine if it is safe to navigate away from this component
  safeToLeave: boolean = true;
  // service to create dialogs with user
  dialogService: DialogService = new DialogService;

  constructor(
    private orderService: OrderService,
    private itemService: ItemService,
    private router: Router,
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

  onStartOrder(): void {
    // set up the queries to retrieve data for the new order
    const poNumberQuery = { // get the order with the greatest poNumber
      sort: '-poNumber',
      limit: 1,
      fields: 'poNumber',
    };
    const itemQuery = { // get all the items with status 'Wanted' for the vendor
      status: 'Wanted',
      vendorName: this.vendorName,
    };

    forkJoin(
      // figure out the po number and create order
      this.orderService.getOrders(poNumberQuery)
        .pipe(
          switchMap( orders => {
            this.order.poNumber = orders.length ? orders[0].poNumber + 1 : 100;
            this.order.vendorName = this.vendorName;
            this.order.dateOrdered = new Date();
            return this.orderService.addOrder(this.order);
          })
        ),
      // get the items for the order
      this.itemService.getItems(itemQuery)
    )
      .subscribe(
        // take the results of the forkjoin and set up order for detail component
        results => {
          let [ order, items ] = results;
          const itemList: Item[] = [];

          // turn generic items into Item objects
          items.map(item => {
            itemList.push(Object.assign(new Item(), item));
          });

          this.order = Object.assign(new Order(), order);
          this.order.items = itemList;
        },
        error => {
          console.log('error caught', error);
        }
      );

    // show the order details
    this.showOrder = true;
    this.safeToLeave = false;
  }

  onOrderCompleted(): void {
    // mark items as ordered and save them to database
    this.order.items.forEach( item => {
      item.status = 'Ordered';
      item.poNumber = this.order.poNumber;
      item.orderedOn = new Date();
      this.itemService.updateItem(item)
        .subscribe(
          // TODO: should probably put some error handling in here
        );
    });

    // mark order as ordered and save to database
    this.order.status = 'Ordered';
    this.orderService.updateOrder(this.order)
      .subscribe(
        () => {
          this.safeToLeave = true;
          this.router.navigateByUrl('/items');
        },
        error => {
          console.log(error);
        }
      );
  }

  onOrderCancelled(): void {
    const message = 'Cancelling this order will delete it, do you wish to procede?';

    this.dialogService.confirm(message)
      .subscribe( response => {
        if ( response ) {
          this.orderService.deleteOrder(this.order)
            .subscribe(
              () => {
                this.safeToLeave = true;
                this.router.navigateByUrl('/items');
              },
              error => {
                console.log(error);
              }
            )
        }
      });
  }

  onItemChanged(item: Item): void {
    this.itemService.updateItem(item)
      .subscribe(
        updatedItem => {
          console.log('item updated', updatedItem);
        },
        error => {
          console.log(error);
        }
      );
  }

  canNavigate(): Observable<boolean> {
    // method called by the route guard to check to
    // see if it is okay to leave order in progress
    const message = 'Leaving the ordering tab will cause the order to be cancelled. Do you wish to do this?'

    if ( this.safeToLeave ) {
      return of(true);
    }

    return this.dialogService.confirm(message)
      .pipe(
        switchMap( response => {
          if ( response ) {
            // user response is leave page and cancel order
            return this.orderService.deleteOrder(this.order);
          } else {
            // user response is to cancel navigation
            return of(this.safeToLeave);
          }
        }),
        switchMap( data => {
          // check to see if deleteOrder was called or not
          if ( typeof data !== 'boolean' ) {
            // if it was called, order was deleted and we can leave
            this.safeToLeave = true;
          }
          return of(this.safeToLeave);
        })
      );
  }


}
