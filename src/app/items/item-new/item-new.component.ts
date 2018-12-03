import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../../models';
import { ItemService } from '../../services';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {

  item: Item = new Item();

  constructor(
    private itemService: ItemService,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.itemService.addItem(this.item)
      .subscribe(
        item => {
          console.log('item added', item);
          form.reset();
          this.item = new Item();
          console.log('item reset', this.item);
        },
        error => {
          console.log(error);
        }
      );
  }

}
