import { TestBed } from '@angular/core/testing';

import { BikeserviceService } from './bikeservice.service';

describe('BikeserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BikeserviceService = TestBed.get(BikeserviceService);
    expect(service).toBeTruthy();
  });
});
