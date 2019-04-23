import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../../models';
import { ItemService, VendorService } from '../../services';
import { changeCurrencyInput } from '../../shared/formatted-input-handlers';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {

  // event to notify parent that a new item is created
  @Output() newItem: EventEmitter<Item> = new EventEmitter();
  // new item for creation
  item: Item = new Item();
  // list of vendor names to use
  vendorList: string[] = [];

  constructor(
    private itemService: ItemService,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    // get the list of vendor names
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
      );
  }

  onSubmit(form: NgForm): void {
    this.itemService.addItem(this.item)
      .subscribe(
        addedItem => {
          // transform item from generic Object to Item object and emit
          this.newItem.emit(Object.assign(new Item(), addedItem));
          this.item = new Item();
          form.reset(this.item);
        },
        error => {
          console.log(error);
        }
      );
  }

  onCurrencyChange(input: any, currencyObject: Item): void {
    changeCurrencyInput(input, currencyObject);
  }

}
