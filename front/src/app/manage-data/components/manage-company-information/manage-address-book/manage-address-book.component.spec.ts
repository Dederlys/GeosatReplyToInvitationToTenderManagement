import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddressBookComponent } from './manage-address-book.component';

describe('ManageAddressBookComponent', () => {
  let component: ManageAddressBookComponent;
  let fixture: ComponentFixture<ManageAddressBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAddressBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAddressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
