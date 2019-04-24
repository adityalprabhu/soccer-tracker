import {Component, OnInit} from '@angular/core';
import {FixtureService} from '../../services/fixtureService/fixture.service';
import {Utils} from '../../../assets/utils';
import {isNullOrUndefined} from 'util';
import {ProfileService} from '../../services/profileService/profile.service';
import {TeamService} from '../../services/teamService/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  liveFixtures: any;
  examples: any;
  today: any;
  loggedIn: boolean;
  hasTeamFixtures: boolean;
  teamFixtures: any;

  constructor(private fixtureService: FixtureService,
              private profileService: ProfileService,
              private teamService: TeamService) {
  }

  user: any;

  ngOnInit() {
    this.loggedIn = false;
    this.hasTeamFixtures = false;
    this.today = new Date();
    this.findLiveFixtures();
    this.getCurrentUser();

  }

  getCurrentUser() {
    this.profileService.findCurrentUser().subscribe(res => {
      this.user = res;
      if (!isNullOrUndefined(this.user)) {

        this.loggedIn = true;
        this.getFixturesForUser();
        console.log(this.user);
        this.user = this.user.firstName;
      }
    });
  }


  getFixturesForUser() {

    let teams = this.user['teams'];
    if (teams.length != 0) {
      this.hasTeamFixtures = true;

      this.teamFixtures = [];
      console.log(typeof teams)

      for (let team of teams) {
        let parsed = parseInt(team, 10);
        console.log(parsed)
        this.teamService.findTeamFixtures(parsed).subscribe(res => {
          // console.log("RES")
          // console.log(res)
          // console.log("RES")

          let allMatches = res;

          let upcomingMatches = [];

          let today = new Date();
          const entries = Object.entries(allMatches['api']['fixtures']);

          for (let [x, y] of entries) {
            if (today <= new Date(y['event_date'])) {
              upcomingMatches.push(y);
            }
          }

          let min;
          if (upcomingMatches.length > 0) {
            min = upcomingMatches[0];
          }

          for (let match of upcomingMatches) {
            if (parseInt(match['event_timestamp'], 10) < parseInt(min['event_timestamp'], 10)) {
              min = match;
            }
          }
          if(min !== undefined){
            this.teamFixtures.push(min);
          }
          console.log(this.teamFixtures)
        });
      }
    }
  }


  findLiveFixtures() {
    this.fixtureService.findLiveFixtures().subscribe(res => {
      var todaysFixtures = [];
      var recentFixtures = Object.values(res['api'].fixtures);
      this.examples = recentFixtures;

      for (let fixture of recentFixtures) {

        let gameTime = new Date(fixture['event_date']);

        if (gameTime.getDate() === this.today.getDate()
          && Utils.SUPPORTEDLEAGUES.includes(parseInt(fixture['league_id'], 10))) {
          todaysFixtures.push(fixture);
        }
      }

      todaysFixtures.sort((a, b) => {
        return parseInt(b['elapsed'], 10) - parseInt(a['elapsed'], 10);
      });
      this.liveFixtures = todaysFixtures;

    });
  }
}
