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

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.base);
  }

  getWantedItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.base}?status=Wanted`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.base, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.base}/${item._id}`, item);
  }

  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(`${this.base}/${item._id}`);
  }

}
