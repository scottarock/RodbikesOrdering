import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../../models';
import { ItemService, VendorService } from '../../services';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item: Item;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  vendorList: string[] = [];

  constructor(
    private itemService: ItemService,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    const query = {
      sort: 'name',
      fields: 'name',
    };
    this.vendorService.getVendors(query)
      .subscribe(
        vendors => {
          this.vendorList = vendors.map(vendor => vendor.name);
        },
        error => {
          console.log(error);
        }
      )
  }

  modalClicked(event: Event): void {
    event.stopPropagation();
  }

  closeClicked(): void {
    this.closeModal.emit();
  }

  updateClicked(): void {
    this.itemService.updateItem(this.item)
      .subscribe(
        updatedItem => {
          this.item = updatedItem;
          this.closeModal.emit();
        },
        error => {
          console.log(error);
        }
    )
  }

}
