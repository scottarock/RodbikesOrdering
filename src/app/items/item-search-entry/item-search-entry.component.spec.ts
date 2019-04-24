import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearchEntryComponent } from './item-search-entry.component';

describe('ItemSearchEntryComponent', () => {
  let component: ItemSearchEntryComponent;
  let fixture: ComponentFixture<ItemSearchEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSearchEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
