import { TestBed } from '@angular/core/testing';

import { MockManageDataService } from './mock-manage-data.service';

describe('MockManageDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockManageDataService = TestBed.get(MockManageDataService);
    expect(service).toBeTruthy();
  });
});
