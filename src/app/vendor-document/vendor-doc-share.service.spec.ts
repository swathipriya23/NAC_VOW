import { TestBed } from '@angular/core/testing';

import { VendorDocShareService } from './vendor-doc-share.service';

describe('VendorDocShareService', () => {
  let service: VendorDocShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorDocShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
