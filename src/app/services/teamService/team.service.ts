import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../apiUrlsService';
import { HttpHeaders } from '@angular/common/http';
import { Utils } from '../../../assets/utils'

const httpOptions = {
  headers: new HttpHeaders({
    'X-RapidAPI-Key':  Utils.RAPIDKEY
  })
};

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  findTeamDetailsApiUrl: string;
  findTeamFixturesApiUrl: string;
  findLeagueStandingsApiUrl: string;
  findLiveFixturesApiUrl: string;
  findLeagueDetailsApiUrl: string;
  findTeamRosterApiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.findTeamDetailsApiUrl = ApiUrlsService.findTeamDetails;
    this.findTeamFixturesApiUrl = ApiUrlsService.findTeamFixtures;
    this.findLeagueStandingsApiUrl = ApiUrlsService.findLeagueStandings;
    this.findLiveFixturesApiUrl = ApiUrlsService.findLiveFixtures;
    this.findLeagueDetailsApiUrl = ApiUrlsService.findLeagueDetails;
    this.findTeamRosterApiUrl = ApiUrlsService.findTeamRoster;
  }

  public findTeamDetails(teamId) {
    return this.httpClient.get(this.findTeamDetailsApiUrl + teamId, httpOptions);
  }

  public findTeamFixtures(teamId) {
    return this.httpClient.get(this.findTeamFixturesApiUrl + teamId, httpOptions);
  }

  public findLeagueStandings(leagueId) {
    return this.httpClient.get(this.findLeagueStandingsApiUrl + leagueId, httpOptions);
  }

  public findLiveFixtures() {
    return this.httpClient.get(this.findLiveFixturesApiUrl, httpOptions);
  }

  public findLeagueDetails(leagueId) {
    return this.httpClient.get(this.findLeagueDetailsApiUrl + leagueId, httpOptions);
  }

  public findTeamRoster(teamId) {
    return this.httpClient.get(this.findTeamRosterApiUrl + teamId, httpOptions);
  }

}

