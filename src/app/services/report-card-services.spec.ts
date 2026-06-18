import { TestBed } from '@angular/core/testing';

import { ReportCardServices } from './report-card-services';

describe('ReportCardServices', () => {
  let service: ReportCardServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportCardServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
