import { TestBed } from '@angular/core/testing';

import { TesttService } from './testt.service';

describe('TesttService', () => {
  let service: TesttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
