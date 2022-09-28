import { TestBed } from '@angular/core/testing';

import { ProjectDetailsshareService } from './project-detailsshare.service';

describe('ProjectDetailsshareService', () => {
  let service: ProjectDetailsshareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDetailsshareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
