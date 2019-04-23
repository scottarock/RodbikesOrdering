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
  // label on the button to show and hide vendor new component
  buttonLabel: string = 'Add Vendor';
  // determines visibility of the vendor new component
  showForm: boolean = false;
  // vendor selected to view/edit details
  selectedVendor: Vendor = null;
  // value for the 'display' style of the modal vendor details component
  modalDisplay: string = 'none';

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    // get the vendors from the database
    const query = {
      sort: 'name',
    };
    this.vendorService.getVendors(query)
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

  vendorAdded(vendor: Vendor): void {
    // TODO: add in sorted order
    // add vendor from the vendor new component to the vendor list
    this.vendors.push(vendor);
  }

  onToggleForm(): void {
    // view or hide the vendor new component and change button label accordingly
    this.buttonLabel = this.buttonLabel === 'Add Vendor' ? 'Done Adding' : 'Add Vendor';
    this.showForm = !this.showForm;
  }

  vendorDetail(vendor: Vendor): void {
    // set the selected vendor and enable modal view of vendor detail component
    this.selectedVendor = Object.assign(new Vendor(), vendor);
    this.modalDisplay = 'block';
  }

  vendorSaved(updatedVendor: Vendor): void {
    // replace the appropriate vendor with the updated one
    this.vendors = this.vendors.map( vendor => {
      return vendor._id === updatedVendor._id ? updatedVendor : vendor;
    });
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
