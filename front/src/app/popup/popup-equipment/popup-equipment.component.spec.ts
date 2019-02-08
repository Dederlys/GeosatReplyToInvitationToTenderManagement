import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEquipmentComponent } from './popup-equipment.component';

describe('PopupEquipmentComponent', () => {
  let component: PopupEquipmentComponent;
  let fixture: ComponentFixture<PopupEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
