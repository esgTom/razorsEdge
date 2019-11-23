import { TestBed } from '@angular/core/testing';

import { ActivitiesCalendarResolversService } from './activities-calendar-resolvers.service';

describe('ActivitiesCalendarResolversService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitiesCalendarResolversService = TestBed.get(ActivitiesCalendarResolversService);
    expect(service).toBeTruthy();
  });
});
