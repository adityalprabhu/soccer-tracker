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


  constructor(private httpClient: HttpClient) {
    this.findLiveFixturesApiUrl = ApiUrlsService.findLiveFixtures;

  }


  public findLiveFixtures() {
    return this.httpClient.get(this.findLiveFixturesApiUrl, httpOptions);
  }
}
