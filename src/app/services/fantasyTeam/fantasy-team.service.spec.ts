import { TestBed } from '@angular/core/testing';

import { FantasyTeamService } from './fantasy-team.service';

describe('FantasyTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FantasyTeamService = TestBed.get(FantasyTeamService);
    expect(service).toBeTruthy();
  });
});
