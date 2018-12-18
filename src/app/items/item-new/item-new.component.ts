import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../../models';
import { ItemService } from '../../services';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {

  @Output() newItem: EventEmitter<Item> = new EventEmitter();
  item: Item = new Item();

  constructor(
    private itemService: ItemService,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.itemService.addItem(this.item)
      .subscribe(
        addedItem => {
          this.newItem.emit(addedItem);
          this.item = new Item();
          form.reset(this.item);
        },
        error => {
          console.log(error);
        }
      );
  }

}
