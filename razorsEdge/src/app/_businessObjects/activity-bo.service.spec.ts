import { TestBed } from '@angular/core/testing';

import { ActivityBoService } from './activity-bo.service';

describe('ActivityBoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityBoService = TestBed.get(ActivityBoService);
    expect(service).toBeTruthy();
  });
});
