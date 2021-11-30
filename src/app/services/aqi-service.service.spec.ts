import { TestBed } from '@angular/core/testing';

import { AqiServiceService } from './aqi-service.service';

describe('AqiServiceService', () => {
  let service: AqiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AqiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
