import { TestBed } from '@angular/core/testing';

import { VendorDocumentService } from './vendor-document.service';

describe('VendorDocumentService', () => {
  let service: VendorDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
