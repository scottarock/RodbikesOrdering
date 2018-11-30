import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.itemService.addItem(this.item)
      .subscribe( item => {
        console.log('item added', item);
        this.item = new Item();
        form.resetForm();
      });
  }

}
