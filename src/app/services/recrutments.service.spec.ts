import { TestBed } from '@angular/core/testing';

import { RecrutmentsService } from './recrutments.service';

describe('RecrutmentsService', () => {
  let service: RecrutmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecrutmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
