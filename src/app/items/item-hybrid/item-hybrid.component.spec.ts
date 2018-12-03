import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHybridComponent } from './item-hybrid.component';

describe('ItemHybridComponent', () => {
  let component: ItemHybridComponent;
  let fixture: ComponentFixture<ItemHybridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHybridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHybridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
