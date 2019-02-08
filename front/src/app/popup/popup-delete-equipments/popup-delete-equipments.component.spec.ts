import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteEquipmentsComponent } from './popup-delete-equipments.component';

describe('PopupDeleteEquipmentsComponent', () => {
  let component: PopupDeleteEquipmentsComponent;
  let fixture: ComponentFixture<PopupDeleteEquipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDeleteEquipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
