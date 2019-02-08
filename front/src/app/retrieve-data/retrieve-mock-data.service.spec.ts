import { TestBed } from '@angular/core/testing';

import { RetrieveMockDataService } from './retrieve-mock-data.service';

describe('RetrieveMockDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrieveMockDataService = TestBed.get(RetrieveMockDataService);
    expect(service).toBeTruthy();
  });
});
