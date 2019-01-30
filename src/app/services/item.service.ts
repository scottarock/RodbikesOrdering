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

  // call server to get Items that exactly match the getParms object
  getItems(getParms: Object): Observable<Item[]> {
    let getString = this.createGetString(getParms);
    if ( getString ) {
      return this.http.get<Item[]>(`${this.base}?${getString}`);
    } else {
      return this.http.get<Item[]>(this.base);
    }
  }

  // call server to get Items that are like the findParms object
  // TODO: make searching work!!!
  findItems(findParms: Object): Observable<Item[]> {
    let findString = this.createFindString(findParms);
    if ( findString ) {
      return this.http.get<Item[]>(`${this.base}?${findString}`);
    } else {
      return this.http.get<Item[]>(this.base);
    }
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

  private createGetString(searchParms: Object): string {
    let searchString = '';
    Object.keys(searchParms)
      .filter(key => searchParms[key])
      .forEach(key => searchString += `${key}=${searchParms[key]}`);
    return searchString;
  }

  private createFindString(searchParms: Object): string {
    let searchString = '';
    Object.keys(searchParms)
      .filter(key => searchParms[key])
      .forEach(key => searchString += `${key}=/${searchParms[key]}/i`);
    return searchString;
  }

}
