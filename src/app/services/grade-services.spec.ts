import { TestBed } from '@angular/core/testing';

import { GradeServices } from './grade-services';

describe('GradeServices', () => {
  let service: GradeServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
