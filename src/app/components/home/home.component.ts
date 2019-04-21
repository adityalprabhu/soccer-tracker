import { Component, OnInit } from '@angular/core';
import {FixtureService} from "../../services/fixtureService/fixture.service";
import {Utils} from "../../../assets/utils";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  liveFixtures: any;
  examples: any
  today: any;
  constructor(private fixtureService: FixtureService) { }
  user: any;

  ngOnInit() {
    this.today = new Date();
    this.findLiveFixtures();
    this.user = localStorage.getItem('user');
    if(!isNullOrUndefined(this.user)){
      console.log(this.user);
      this.user = JSON.parse(this.user).firstName;
    }
  }

  findLiveFixtures(){
    this.fixtureService.findLiveFixtures().subscribe(res => {
      var todaysFixtures = [];
      var recentFixtures = Object.values(res['api'].fixtures);
      console.log(recentFixtures);
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
