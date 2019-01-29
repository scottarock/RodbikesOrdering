import { Component, OnInit } from '@angular/core';

import { Vendor } from '../../models';
import { VendorService } from '../../services';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  // the vendors in the list
  vendors: Vendor[] = [];
  // vendor selected to view/edit details
  selectedVendor: Vendor = null;
  // value for the 'display' style of the modal vendor details component
  modalDisplay: string = 'none';

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    // get the vendors from the database
    this.vendorService.getVendors()
      .subscribe(
        vendors => {
          // transform vendors from generic Object to Vendor object
          const vendorList = [];
          vendors.map(vendor => {
            let newVendor = new Vendor();
            vendorList.push(Object.assign(newVendor, vendor));
          });
          // set the vendors array to the list of Vendor objects
          this.vendors = vendorList;
        },
        error => {
          console.log(error);
        }
      );
  }

  vendorDetail(vendor: Vendor): void {
    // set the selected vendor and enable modal view of vendor detail component
    this.selectedVendor = vendor;
    this.modalDisplay = 'block';
  }

  closeModal(event: Event): void {
    if ( event ) {
      // stop the click event from propogating further
      event.stopPropagation();
    }
    // close the modal view of the vendor detail component and clear selected vendor
    this.modalDisplay = 'none';
    this.selectedVendor = null;
  }

}
