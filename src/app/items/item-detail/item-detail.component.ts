import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../../models';
import { ItemService, VendorService } from '../../services';
import { changeCurrencyInput } from '../../shared/formatted-input-handlers';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item: Item;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() savedItem: EventEmitter<Item> = new EventEmitter();
  vendorList: string[] = [];

  constructor(
    private itemService: ItemService,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    // get the list of all vendor names to have as a list
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
    // if click occurs inside the modal window, don't want to close window
    event.stopPropagation();
  }

  closeClicked(): void {
    // click event from the close button in the modal window
    this.closeModal.emit();
  }

  updateClicked(): void {
    // save the changed item to the database and send it to the item list
    this.itemService.updateItem(this.item)
      .subscribe(
        updatedItem => {
          this.item = updatedItem;
          this.savedItem.emit(Object.assign(new Item(), this.item));
          this.closeModal.emit();
        },
        error => {
          console.log(error);
        }
    )
  }

  onCurrencyChange(input: any, currencyObject: Item ): void {
    changeCurrencyInput(input, currencyObject);
  }

}
