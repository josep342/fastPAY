import { TestBed } from '@angular/core/testing';

import { DexiAPIService } from './dexi-api.service';

describe('DexiAPIService', () => {
  let service: DexiAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexiAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
