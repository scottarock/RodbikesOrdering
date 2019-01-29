import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Vendor } from '../../models';
import { VendorService } from '../../services';

@Component({
  selector: 'app-vendor-new',
  templateUrl: './vendor-new.component.html',
  styleUrls: ['./vendor-new.component.css']
})
export class VendorNewComponent implements OnInit {

  @Output() newVendor: EventEmitter<Vendor> = new EventEmitter();
  vendor: Vendor = new Vendor();

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    this.vendorService.addVendor(this.vendor)
      .subscribe(
        addedVendor => {
          let tempVendor = new Vendor();
          // transform vendor from generic Object to Vendor object and emit
          this.newVendor.emit(Object.assign(tempVendor, addedVendor));
          this.vendor = new Vendor;
          form.reset(this.vendor);
        },
        error => {
          console.log(error);
        }
      );
  }

}
