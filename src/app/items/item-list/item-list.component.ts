import { Component, OnInit } from '@angular/core';

import { Item } from '../../models';
import { ItemService } from '../../services';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  // the items in the list
  items: Item[] = [];
  // label on button to show and hide item new component
  buttonLabel: string = 'Add Items';
  // determines visibility of the item new  component
  showForm: boolean = false;
  // item selected to view/edit details
  selectedItem: Item = null;
  // value for the 'display' style of the modal item details component
  modalDisplay: string = 'none';

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    // get the wanted items from the database
    this.itemService.getItems({ status: 'Wanted' })
      .subscribe(
        items => {
          // convert generic Objects into Item objects
          const itemList = [];
          items.map(item => {
            let newItem = new Item();
            itemList.push(Object.assign(newItem, item));
          });
          // set the items array to the list of Item objects
          this.items = itemList;
        },
        error => {
          console.log(error);
        }
      );
  }

  itemAdded(item: Item): void {
    // add item from item new component to the item list
    this.items.push(item);
  }

  onDelete(item: Item): void {
    this.itemService.deleteItem(item)
      .subscribe( deletedItem => {
        // remove deleted item from list
        this.items = this.items.filter( i => {
          return i._id !== deletedItem._id;
        });
      });
  }

  onToggleForm(): void {
    // view or hide the item new component and change button label accordingly
    this.buttonLabel = this.buttonLabel === 'Add Items' ? 'Done Adding' : 'Add Items';
    this.showForm = !this.showForm;
  }

  itemDetail(item: Item): void {
    // set the selected item and enable the modal view of item detail component
    this.selectedItem = item;
    this.modalDisplay = 'block';
  }

  closeModal(event: Event): void {
    if ( event ) {
      // stop the click event from propogating further
      event.stopPropagation();
    }
    // close the modal view of the item detail component and clear selected item
    this.modalDisplay = 'none';
    this.selectedItem = null;
  }

}
