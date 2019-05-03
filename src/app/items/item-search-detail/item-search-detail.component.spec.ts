import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearchDetailComponent } from './item-search-detail.component';

describe('ItemSearchDetailComponent', () => {
  let component: ItemSearchDetailComponent;
  let fixture: ComponentFixture<ItemSearchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSearchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
