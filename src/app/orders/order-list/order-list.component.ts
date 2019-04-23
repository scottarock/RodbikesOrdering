import { Component, OnInit } from '@angular/core';

import { Order } from '../../models';
import { OrderService } from '../../services';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  // the list of orders
  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    // get the orders for the list
    this.orderService.getOrders()
      .subscribe (
        orders => {
          this.orders = orders
        },
        error => {
          console.log(error);
        }
      );
  }

}
