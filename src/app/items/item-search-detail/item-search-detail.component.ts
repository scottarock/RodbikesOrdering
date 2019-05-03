import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../../models';

@Component({
  selector: 'app-item-search-detail',
  templateUrl: './item-search-detail.component.html',
  styleUrls: ['./item-search-detail.component.css']
})
export class ItemSearchDetailComponent implements OnInit {

  // the item to show details
  @Input() item: Item;
  // event to close this modal component
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  modalClicked(event: Event): void {
    // if click occures inside the modal window, don't close window
    event.stopPropagation();
  }

  closeClicked(): void {
    // click event from the close button in the modal window
    this.closeModal.emit();
  }

}
