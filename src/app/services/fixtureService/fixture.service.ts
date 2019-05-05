import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiUrlsService} from "../apiUrlsService";



const httpOptions = {
  headers: new HttpHeaders({
    'X-RapidAPI-Key':  '2c4a4fc99amshe50fdd337dd7144p16d624jsn64cd58af65a9'
  })
};

@Injectable({
  providedIn: 'root'
})

export class FixtureService {

  findLiveFixturesApiUrl: string;
  findLeagueFixturesUrl: string;
  findTeamFixturesUrl: string;
  findTodaysFixturesUrl: string;


  constructor(private httpClient: HttpClient) {
    this.findLiveFixturesApiUrl = ApiUrlsService.findLiveFixtures;
    this.findLeagueFixturesUrl = ApiUrlsService.findLeagueFixtures;
    this.findTeamFixturesUrl = ApiUrlsService.findTeamFixtures;
    this.findTodaysFixturesUrl = ApiUrlsService.findTodaysFixtures;

  }

  public findFixturesForTeam(teamId){
    return this.httpClient.get(this.findTeamFixturesUrl + teamId, httpOptions);
  }

  public findLeagueFixtures(leagueID) {
    return this.httpClient.get(this.findLeagueFixturesUrl + leagueID, httpOptions);
  }

  public findLiveFixtures() {
    return this.httpClient.get(this.findLiveFixturesApiUrl, httpOptions);
  }

  public findTodaysFixtures(yyyymmdd) {
    return this.httpClient.get(this.findTodaysFixturesUrl + yyyymmdd, httpOptions);
  }
}
