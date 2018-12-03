import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-hybrid',
  templateUrl: './item-hybrid.component.html',
  styleUrls: ['./item-hybrid.component.css']
})
export class ItemHybridComponent implements OnInit {

  buttonLabel: string = 'Add Items';
  showForm: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  onToggleForm() {
    this.buttonLabel = this.buttonLabel === 'Add Items' ? 'Done Adding' : 'Add Items';
    this.showForm = !this.showForm;
  }

}
