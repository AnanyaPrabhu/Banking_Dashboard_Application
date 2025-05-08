import { TestBed } from '@angular/core/testing';

import { AllDepositsService } from './all-deposits.service';

describe('AllDepositsService', () => {
  let service: AllDepositsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllDepositsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
