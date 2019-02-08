import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIdentityPapersTypeComponent } from './manage-identity-papers-type.component';

describe('ManageIdentityPapersTypeComponent', () => {
  let component: ManageIdentityPapersTypeComponent;
  let fixture: ComponentFixture<ManageIdentityPapersTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIdentityPapersTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIdentityPapersTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
