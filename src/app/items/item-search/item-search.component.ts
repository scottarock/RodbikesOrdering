import { Component, OnInit } from '@angular/core';

import { Item } from '../../models';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {

  items: Item[] = [];
  message: string = '';

  constructor() { }

  ngOnInit() {
  }

  itemsFound(items: Item[]) {
    this.message = items.length === 0
      ? 'No items matched'
      : `${items.length} items found`;
    this.items = items;
  }

}
