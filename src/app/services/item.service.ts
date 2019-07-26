import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createTextQuery, createNumberQuery, createDateQuery } from '../shared/create-query-url';

import { Item } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // the base url for the item api
  base = '/api/items';

  constructor(private http: HttpClient) { }

  // call server to search for items that meet the query parameters
  searchItems(itemQuery: Object = {}): Observable<Item[]> {

    // the Item properties that are strings
    const stringProperties: string[] = [
      'description',
      'requestedBy',
      'department',
      'specialOrder',
      'customer',
      'vendorName',
      'partNumber',
      'status'
    ];
    // the Item properties that are numbers
    const numberProperties: string[] = [
      'quantity',
      'cost',
      'price',
      'shipping',
      'poNumber'
    ];
    // the Item properties that are dates
    const dateProperties: string[] = [
      'requestedOn',
      'orderedOn'
    ];

    let urlQuery = '';
    // go through each property and create the url search string for it
    Object.keys(itemQuery).forEach(key => {
      urlQuery += urlQuery.length === 0 ? '?' : '&';
      if (stringProperties.includes(key)) {
        urlQuery += createTextQuery(key, itemQuery[key].trim());
      } else if (numberProperties.includes(key)) {
        urlQuery += createNumberQuery(key, itemQuery[key].trim());
      } else if (dateProperties.includes(key)) {
        urlQuery += createDateQuery(key, itemQuery[key].trim());
      }
    });

    // use the query created to search the database
    return this.http.get<Item[]>(`${this.base}${urlQuery}`);
  }

  // call server to get Items that match the findParams object
  getItems(findParams: Object = {}): Observable<Item[]> {

    return this.http.get<Item[]>(
        this.base,
        { params: findParams as HttpParams }
      );
  }

  // call server to create a new Item in database
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.base, item);
  }

  // call server to update an Item in database
  updateItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.base}/${item._id}`, item);
  }

  // call server to delete an Item from database
  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(`${this.base}/${item._id}`);
  }

}
