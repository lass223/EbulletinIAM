import { TestBed } from '@angular/core/testing';

import { SubjectServices } from './subject-services';

describe('SubjectServices', () => {
  let service: SubjectServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
