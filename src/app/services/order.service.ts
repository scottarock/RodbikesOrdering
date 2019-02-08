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

  private createFindString(searchParms: Object): string {
    let searchString = '';
    Object.keys(searchParms)
      .filter(key => searchParms[key])
      .forEach(key => searchString += `${key}=${searchParms[key]}`);
    return searchString;
  }

}
