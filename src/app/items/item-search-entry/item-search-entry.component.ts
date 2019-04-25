import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../../models';
import { VendorService, ItemService } from '../../services';

@Component({
  selector: 'app-item-search-entry',
  templateUrl: './item-search-entry.component.html',
  styleUrls: ['./item-search-entry.component.css']
})
export class ItemSearchEntryComponent implements OnInit {

  // list of the vendor names from the database
  vendors: string[] = [];
  // event to send the found items to the parent
  @Output() itemList: EventEmitter<Item[]> = new EventEmitter();

  constructor(
    private itemService: ItemService,
    private vendorService: VendorService,
  ) { }

  ngOnInit() {
    // retrieve the list of vendor names for the input form
    const query = {
      sort: 'name',
      fields: 'name',
    };
    this.vendorService.getVendors(query)
      .subscribe(
        vendors => {
          this.vendors = vendors.map(vendor => vendor.name);
        },
        error => {
          console.log(error)
        }
      );
  }

  onSubmit(form: NgForm): void {
    Object.keys(form.value).forEach(key => {
      if ( !form.value[key] ) {
        delete form.value[key];
      }
    });
    this.itemService.getItems(form.value)
      .subscribe(
        items => {
          this.itemList.emit(items);
        },
        error => {
          console.log(error);
        }
      )
  }

  onClearForm(form: NgForm): void {
    form.reset();
  }

}
