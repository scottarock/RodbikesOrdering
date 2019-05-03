import { Component, OnInit } from '@angular/core';

import { Item } from '../../models';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {

  // the list of items found by the search
  items: Item[] = [];
  // message to inform user how many items found in search
  message: string = '';
  // item selected to view details
  selectedItem: Item = null;
  // value for the 'display' style of the modal item  search details component
  modalDisplay: string = 'none';

  constructor() { }

  ngOnInit() {
  }

  itemsFound(items: Item[]): void {
    this.message = items.length === 0
      ? 'No items matched'
      : `${items.length} items found`;
    this.items = items;
  }

  itemDetail(item: Item): void {
    // set the selected item and enable the modal view of the item detail component
    this.selectedItem = Object.assign(new Item(), item);
    this.modalDisplay = 'block';
  }

  closeModal(event: Event): void {
    if ( event ) {
      // stop the click from propogating further
      event.stopPropagation();
    }
    // close the modal view of the item detail component and clear selected item
    this.modalDisplay = 'none';
    this.selectedItem = null;
  }

}
