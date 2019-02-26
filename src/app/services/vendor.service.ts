import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vendor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  base: string = '/api/vendors';

  constructor(private http: HttpClient) { }

  getVendors(findParms: Object = {}): Observable<Vendor[]> {
    let findString = this.createFindString(findParms);
    if ( findString ) {
      return this.http.get<Vendor[]>(`${this.base}?${findString}`);
    } else {
      return this.http.get<Vendor[]>(this.base);
    }
  }

  addVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.base, vendor);
  }

  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.base}/${vendor._id}`, vendor);
  }

//******************************************************************************
// TODO: create a helper module with this code in it
// currently duplicated in order.service.ts and item.service.ts

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

//******************************************************************************

}
