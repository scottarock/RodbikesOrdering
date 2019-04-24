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
  // order selected to view the details
  selectedOrder: Order = null;
  // value for the 'display' style of the modal order view component
  modalDisplay: string = 'none';

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

  orderView(order: Order): void {
    // set the selected order and enable the modal view of the order view component
    this.selectedOrder = Object.assign(new Order(), order);
    this.modalDisplay = 'block';
  }

  closeModal(event: Event): void {
    if (event) {
      // stop the click event from propogating further
      event.stopPropagation();
    }
    // close the modal view of the order view component and clear selected order
    this.modalDisplay = 'none';
    this.selectedOrder = null;
  }

}
