import { Component, OnInit } from '@angular/core';

import { Order } from '../../models';
import { OrderService } from '../../services';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
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
