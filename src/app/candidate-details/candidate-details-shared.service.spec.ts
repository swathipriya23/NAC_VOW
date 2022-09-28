import { TestBed } from '@angular/core/testing';

import { CandidateDetailsSharedService } from './candidate-details-shared.service';

describe('CandidateDetailsSharedService', () => {
  let service: CandidateDetailsSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateDetailsSharedService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
