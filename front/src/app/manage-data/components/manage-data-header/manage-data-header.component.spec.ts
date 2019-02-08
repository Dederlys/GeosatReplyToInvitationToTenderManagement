import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDataHeaderComponent } from './manage-data-header.component';

describe('ManageDataHeaderComponent', () => {
  let component: ManageDataHeaderComponent;
  let fixture: ComponentFixture<ManageDataHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDataHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
