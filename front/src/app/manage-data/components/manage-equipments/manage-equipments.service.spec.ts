import { TestBed } from '@angular/core/testing';

import { ManageEquipmentsService } from './manage-equipments.service';

describe('ManageEquipmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageEquipmentsService = TestBed.get(ManageEquipmentsService);
    expect(service).toBeTruthy();
  });
});
