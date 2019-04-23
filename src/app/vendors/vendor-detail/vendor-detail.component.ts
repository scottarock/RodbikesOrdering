import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Vendor } from '../../models';
import { VendorService } from '../../services';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  // the vendor that is being viewed
  @Input() vendor: Vendor;
  // event to close this modal component
  @Output() closeModal: EventEmitter<void> = new EventEmitter;
  // event to let the parent component know that the vendor is updated
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
