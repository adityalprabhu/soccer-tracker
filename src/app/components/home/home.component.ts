import { Component, OnInit } from '@angular/core';
import {FixtureService} from "../../services/fixtureService/fixture.service";
import {Utils} from "../../../assets/utils";
import {isNullOrUndefined} from "util";
import {ProfileService} from "../../services/profileService/profile.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  liveFixtures: any;
  examples: any
  today: any;
  loggedIn: boolean;

  constructor(private fixtureService: FixtureService,
              private profileService: ProfileService) { }
  user: any;

  ngOnInit() {
    this.loggedIn = false;
    this.today = new Date();
    this.findLiveFixtures();

    this.getCurrentUser();

  }

  getCurrentUser() {
    this.profileService.findCurrentUser().subscribe(res => {
      this.user = res;
      if(!isNullOrUndefined(this.user)){
        this.loggedIn = true;
        console.log(this.user);
        this.user = this.user.firstName;
      }
    });
  }

  findLiveFixtures(){
    this.fixtureService.findLiveFixtures().subscribe(res => {
      var todaysFixtures = [];
      var recentFixtures = Object.values(res['api'].fixtures);
      this.examples = recentFixtures;

      for (let fixture of recentFixtures) {

        let gameTime = new Date(fixture['event_date']);

        if (gameTime.getDate() === this.today.getDate()
          && Utils.SUPPORTEDLEAGUES.includes(parseInt(fixture['league_id'], 10))) {
          todaysFixtures.push(fixture);
          console.log(todaysFixtures);
        }
      }

      todaysFixtures.sort((a, b) => {
        return parseInt(b['elapsed'], 10) - parseInt(a['elapsed'], 10);
      });
      this.liveFixtures = todaysFixtures;

      console.log(this.liveFixtures);

    });
  }
}
