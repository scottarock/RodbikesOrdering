import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Item } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  base: string = '/api/items';

  constructor(private http: HttpClient) { }

  // TODO: Make one get that uses an object parameter with the find criteria
  // to get items in all circumstances
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.base);
  }
  getWantedItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.base}?status=Wanted`);
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
