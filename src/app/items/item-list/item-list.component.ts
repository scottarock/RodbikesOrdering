import { Component, OnInit } from '@angular/core';

import { Item } from '../../models';
import { ItemService } from '../../services';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems()
      .subscribe( items => {
        this.items = items;
      });
  }

  onDelete(item: Item): void{
    this.itemService.deleteItem(item)
      .subscribe( deletedItem => {
        this.items = this.items.filter( i => {
          return i._id !== deletedItem._id;
        });
      });
  }

}
