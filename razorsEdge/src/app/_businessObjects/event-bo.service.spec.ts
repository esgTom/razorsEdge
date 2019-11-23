import { TestBed, inject } from '@angular/core/testing';

import { EventBO } from './event-bo.service';

describe('EventBoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventBO]
    });
  });

  it('should be created', inject([EventBO], (service: EventBO) => {
    expect(service).toBeTruthy();
  }));
});
