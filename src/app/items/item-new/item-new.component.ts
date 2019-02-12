import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../../models';
import { ItemService, VendorService } from '../../services';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {

  @Output() newItem: EventEmitter<Item> = new EventEmitter();
  item: Item = new Item();
  vendorList: string[] = [];

  constructor(
    private itemService: ItemService,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    this.vendorService.getVendors()
      .subscribe(
        vendors => {
          this.vendorList = vendors.map(vendor => vendor.name);
          this.vendorList.sort();
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
          let tempItem = new Item();
          // transform item from generic Object to Item object and emit
          this.newItem.emit(Object.assign(tempItem, addedItem));
          this.item = new Item();
          form.reset(this.item);
        },
        error => {
          console.log(error);
        }
      );
  }

}
