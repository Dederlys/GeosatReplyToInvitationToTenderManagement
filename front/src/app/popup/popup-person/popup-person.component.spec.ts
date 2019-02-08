import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPersonComponent } from './popup-person.component';

describe('PopupDetailComponent', () => {
  let component: PopupPersonComponent;
  let fixture: ComponentFixture<PopupPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
