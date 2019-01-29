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

  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.base);
  }

  addVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.base, vendor);
  }

  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.base}/${vendor._id}`, vendor);
  }

}
