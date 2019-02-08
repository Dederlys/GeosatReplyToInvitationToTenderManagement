import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEquipmentsComponent } from './manage-equipments.component';

describe('ManageEquipmentComponent', () => {
  let component: ManageEquipmentsComponent;
  let fixture: ComponentFixture<ManageEquipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEquipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
