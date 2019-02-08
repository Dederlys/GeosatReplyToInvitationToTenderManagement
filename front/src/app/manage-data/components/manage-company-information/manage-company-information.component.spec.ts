import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyInformationComponent } from './manage-company-information.component';

describe('ManageCompanyInformationComponent', () => {
  let component: ManageCompanyInformationComponent;
  let fixture: ComponentFixture<ManageCompanyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCompanyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompanyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
