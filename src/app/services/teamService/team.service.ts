import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../apiUrlsService';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'X-RapidAPI-Key':  '2c4a4fc99amshe50fdd337dd7144p16d624jsn64cd58af65a9'
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

  constructor(private httpClient: HttpClient) {
    this.findTeamDetailsApiUrl = ApiUrlsService.findTeamDetails;
    this.findTeamFixturesApiUrl = ApiUrlsService.findTeamFixtures;
    this.findLeagueStandingsApiUrl = ApiUrlsService.findLeagueStandings;
    this.findLiveFixturesApiUrl = ApiUrlsService.findLiveFixtures;
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
}

