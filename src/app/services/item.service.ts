import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Item } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  base: string = '/api/items';

  constructor(private http: HttpClient) { }

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
