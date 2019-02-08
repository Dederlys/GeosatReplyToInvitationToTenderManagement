import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContractTypeComponent } from './manage-contract-type.component';

describe('ManageContractTypeComponent', () => {
  let component: ManageContractTypeComponent;
  let fixture: ComponentFixture<ManageContractTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageContractTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContractTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
