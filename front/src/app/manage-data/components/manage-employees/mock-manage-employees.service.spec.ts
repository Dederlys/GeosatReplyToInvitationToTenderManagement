import { TestBed } from '@angular/core/testing';

import { MockManageEmployeesService } from './mock-manage-employees.service';

describe('MockManageEmployeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockManageEmployeesService = TestBed.get(MockManageEmployeesService);
    expect(service).toBeTruthy();
  });
});
