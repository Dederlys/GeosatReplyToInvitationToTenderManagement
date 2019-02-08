import { TestBed } from '@angular/core/testing';

import { SelectedDataService } from './selected-data.service';

describe('SelectedDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedDataService = TestBed.get(SelectedDataService);
    expect(service).toBeTruthy();
  });
});
