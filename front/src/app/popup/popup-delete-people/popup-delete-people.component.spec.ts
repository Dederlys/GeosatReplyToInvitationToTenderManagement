import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeletePeopleComponent } from './popup-delete-people.component';

describe('PopupDeletePeopleComponent', () => {
  let component: PopupDeletePeopleComponent;
  let fixture: ComponentFixture<PopupDeletePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDeletePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeletePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
