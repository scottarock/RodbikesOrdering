import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorNewComponent } from './vendor-new.component';

describe('VendorNewComponent', () => {
  let component: VendorNewComponent;
  let fixture: ComponentFixture<VendorNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
