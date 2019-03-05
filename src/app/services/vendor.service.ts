import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vendor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  base: string = '/api/vendors';

  constructor(private http: HttpClient) { }

  getVendors(findParams: Object = {}): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(
      this.base,
      { params: findParams as HttpParams }
    );
  }

  addVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.base, vendor);
  }

  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.base}/${vendor._id}`, vendor);
  }

}
