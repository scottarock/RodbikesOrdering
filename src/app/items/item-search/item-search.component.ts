import { Component, OnInit } from '@angular/core';

import { Item } from '../../models';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {

  items: Item[] = [];

  constructor() { }

  ngOnInit() {
  }

  itemsFound(items: Item[]) {
    console.log('received item list', items)
    this.items = items;
  }

}
