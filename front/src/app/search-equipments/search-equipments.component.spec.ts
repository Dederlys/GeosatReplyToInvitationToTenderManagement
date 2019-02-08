import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEquipmentsComponent } from './search-equipments.component';

describe('SearchEquipmentsComponent', () => {
  let component: SearchEquipmentsComponent;
  let fixture: ComponentFixture<SearchEquipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEquipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
