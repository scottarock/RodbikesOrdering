import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Vendor } from '../../models';
import { VendorService } from '../../services';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  @Input() vendor: Vendor;
  @Output() closeModal: EventEmitter<void> = new EventEmitter;
  @Output() savedVendor: EventEmitter<Vendor> = new EventEmitter;

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
  }

  modalClicked(event: Event): void {
    // if click occurs inside the modal window, don't want to close window
    event.stopPropagation();
  }

  closeClicked(): void {
    // click event from the close button in the modal window
    this.closeModal.emit();
  }

  updateClicked(): void {
    // save the changed vendor to the database and send it to the vendor list
    this.vendorService.updateVendor(this.vendor)
      .subscribe(
        updatedVendor => {
          this.vendor = updatedVendor;
          this.savedVendor.emit(Object.assign(new Vendor(), updatedVendor));
          this.closeModal.emit();
        },
        error => {
          console.log(error);
        }
      )
  }

}
