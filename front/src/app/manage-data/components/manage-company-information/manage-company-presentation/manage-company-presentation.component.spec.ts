import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyPresentationComponent } from './manage-company-presentation.component';

describe('ManageCompanyPresentationComponent', () => {
  let component: ManageCompanyPresentationComponent;
  let fixture: ComponentFixture<ManageCompanyPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCompanyPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompanyPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
