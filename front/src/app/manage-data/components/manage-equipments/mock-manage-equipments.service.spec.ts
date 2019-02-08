import { TestBed } from '@angular/core/testing';

import { MockManageEquipmentsService } from './mock-manage-equipments.service';

describe('MockManageEquipmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockManageEquipmentsService = TestBed.get(MockManageEquipmentsService);
    expect(service).toBeTruthy();
  });
});
