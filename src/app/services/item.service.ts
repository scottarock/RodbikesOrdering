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

  // call server to get Items that match the findParms object
  getItems(findParms: Object): Observable<Item[]> {
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

  // TODO: create a helper module with this code in it
  // currently duplicated in order.service.ts
  // parse the parms object (conforms to Item) to create
  // query for the html request
  private createFindString(searchParms: Object): string {
    let searchString = '';
    Object.keys(searchParms)
      .filter(key => searchParms[key])
      .forEach(key =>
        {
          searchParms[key] = this.replaceSpecialCharacters(searchParms[key]);
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

}
