import { Component, OnInit } from '@angular/core';
import {FixtureService} from "../../services/fixtureService/fixture.service";
import {Utils} from "../../../assets/utils";

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

  ngOnInit() {
    this.today = new Date();
    this.findLiveFixtures();
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

      // if (todaysFixtures.length !== 0) {
      //   let showLiveScores = document.getElementById('live-fixtures');
      //   showLiveScores.style.display = 'inline';
      // } else {
      //   let showNoLiveMatches = document.getElementById('no-live-fixtures');
      //   showNoLiveMatches.style.display = 'inline';
      // }
    });
  }
}
