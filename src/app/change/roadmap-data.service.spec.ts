import { TestBed } from '@angular/core/testing';

import { RoadmapDataService } from './roadmap-data.service';

describe('RoadmapDataService', () => {
  let service: RoadmapDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadmapDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
