import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Order } from '../../models';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  // the order to view
  @Input() order: Order;
  // event to close this modal component
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  modalClicked(event: Event): void {
    // if click occurs inside the modal window, don't want to close window
    event.stopPropagation();
  }

  closeClicked(): void {
    // clkck event from the close buttonin the modal window
    this.closeModal.emit();
  }

}
