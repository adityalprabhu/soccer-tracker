import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiUrlsService {

  // comments apis
  public static findAllComments = environment.local5000 + '/api/comments';
  public static createComment = environment.local5000 + '/api/comment';
  public static deleteComment = environment.local5000 + '/api/comment/';
  public static findUserByTeamIdApi = environment.local5000 + '/api/user/team/';

  public static findTeamDetails = environment.fdomain + '/teams/team/';
  public static findTeamFixtures = environment.fdomain + '/fixtures/team/';
  public static findLeagueStandings = environment.fdomain + '/leagueTable/';
  public static findLiveFixtures = environment.fdomain + '/fixtures/live';
  public static findLeagueDetails = environment.fdomain + '/leagues/league/';

  public static findLeagueFixtures = environment.fdomain + '/fixtures/league/';

  public static findTeamRoster = environment.fdomain + '/players/2018/';

  public static findTeamLogo = environment.local5000 + '/api/logo/team/';
  public static findLeagueLogo = environment.local5000 + '/api/logo/league/';

  public static findTeamStats = environment.fdomain + '/statistics/';
  public static findTeamByLeagueId = environment.fdomain + '/teams/league/';
  public static findTodaysFixtures = environment.fdomain + '/fixtures/date/';

}
