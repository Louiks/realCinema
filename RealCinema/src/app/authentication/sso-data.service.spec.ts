import { TestBed } from '@angular/core/testing';

import { SsoDataService } from './sso-data.service';

describe('SsoDataService', () => {
  let service: SsoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
