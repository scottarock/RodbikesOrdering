import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vendor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  // the base url for the vendor api
  base: string = '/api/vendors';

  constructor(private http: HttpClient) { }

  // call server to get Vendors that match the findParams object
  getVendors(findParams: Object = {}): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(
      this.base,
      { params: findParams as HttpParams }
    );
  }

  // call server to create a new Vendor in the database
  addVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.base, vendor);
  }

  // call server to delete a Vendor from the database
  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.base}/${vendor._id}`, vendor);
  }

}
