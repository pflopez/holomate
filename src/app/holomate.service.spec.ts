import { TestBed } from '@angular/core/testing';

import { HolomateService } from './holomate.service';

describe('HolomateService', () => {
  let service: HolomateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolomateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
