import { TestBed } from '@angular/core/testing';

import { NewHallService } from './new-hall.service';

describe('NewHallService', () => {
  let service: NewHallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewHallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
