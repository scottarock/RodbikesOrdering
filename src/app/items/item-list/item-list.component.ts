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
  selectedItem: Item = null;
  buttonLabel: string = 'Add Items';
  showForm: boolean = false;
  modalDisplay: string = 'none';

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems()
      .subscribe( items => {
        this.items = items;
      });
  }

  itemAdded(item: Item): void {
    this.items.push(item);
  }

  onDelete(item: Item): void {
    this.itemService.deleteItem(item)
      .subscribe( deletedItem => {
        this.items = this.items.filter( i => {
          return i._id !== deletedItem._id;
        });
      });
  }

  onToggleForm(): void {
    this.buttonLabel = this.buttonLabel === 'Add Items' ? 'Done Adding' : 'Add Items';
    this.showForm = !this.showForm;
  }

  itemDetail(item: Item): void {
    this.selectedItem = item;
    this.modalDisplay = 'block';
  }

  closeModal(event: Event): void {
    if ( event ) {
      event.stopPropagation();
    }
    this.modalDisplay = 'none';
    this.selectedItem = null;
  }

}
