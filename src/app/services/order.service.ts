import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  base: string = '/api/orders';

  constructor(private httpClient: HttpClient) { }

  // call server to get Orders that match the getParms object
  getOrders(findParms: Object): Observable<Order[]> {
    let findString = this.createFindString(findParms);
    if ( findString ) {
      return this.httpClient.get<Order[]>(`${this.base}?${findString}`);
    } else {
      return this.httpClient.get<Order[]>(this.base);
    }
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

//******************************************************************************
// TODO: create a helper module with this code in it
// currently duplicated in item.service.ts

// parse the parms object (conforms to Order) to create
// query for the html request

  private createFindString(searchParms: Object): string {
    let searchString = '';
    Object.keys(searchParms)
      .filter(key => searchParms[key])
      .forEach(key =>
        {
          searchParms[key] = this.replaceSpecialCharacters(searchParms[key]);
          console.log(key, '=>', searchParms[key]);
          searchString
            ? searchString += `&${key}=${searchParms[key]}`
            : searchString = `${key}=${searchParms[key]}`
        }
      );
    return searchString;
  }

  private replaceSpecialCharacters(parm: string): string {
    const replaceChars = {
      '&' : '%26',
      '+' : '%2B',
    };
    let tempParm: string = parm;
    Object.keys(replaceChars).forEach( specialChar => {
      while (tempParm.includes(specialChar)) {
        tempParm = tempParm.replace(specialChar, replaceChars[specialChar]);
      }
    });
    return tempParm;
  }

//******************************************************************************

}
