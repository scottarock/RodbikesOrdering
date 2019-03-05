import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  base: string = '/api/orders';

  constructor(private httpClient: HttpClient) { }

  // call server to get Orders that match the getParms object
  getOrders(findParams: Object = {}): Observable<Order[]> {
    return this.httpClient.get<Order[]>(
      this.base,
      { params: findParams as HttpParams }
    );
  }

  // call server to create a new Order in database
  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.base, order);
  }

  // call server to update an Order in database
  updateOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.base}/${order._id}`, order);
  }

  // call server to delete an Order from database
  deleteOrder(order: Order): Observable<Order> {
    return this.httpClient.delete<Order>(`${this.base}/${order._id}`);
  }

}
