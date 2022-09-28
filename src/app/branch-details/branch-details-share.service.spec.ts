import { TestBed } from '@angular/core/testing';

import { BranchDetailsShareService } from './branch-details-share.service';

describe('BranchDetailsShareService', () => {
  let service: BranchDetailsShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchDetailsShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
