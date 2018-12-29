import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../../models';
import { ItemService } from '../../services';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item: Item;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  modalClicked(event: Event): void {
    event.stopPropagation();
  }

  closeClicked(): void {
    this.closeModal.emit();
  }

  updateClicked(): void {
    this.itemService.updateItem(this.item)
      .subscribe(
        updatedItem => {
          this.item = updatedItem;
          this.closeModal.emit();
        },
        error => {
          console.log(error);
        }
    )
  }

}
