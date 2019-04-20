import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FixtureService} from '../../services/fixtureService/fixture.service';
import {Utils} from '../../../assets/utils';
import {element} from 'protractor';
import {TeamService} from '../../services/teamService/team.service';


@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {


  fixtures: any;
  leagueIDs: any;
  today: Date;
  englishLeague: true;
  spanishLeague: true;
  germanLeague: true;
  frenchLeague: true;
  italianLeague: true;

  englishGames: any;
  spanishGames: any;
  germanGames: any;
  frenchGames: any;
  italianGames: any;
  allGames: any;

  todayGames: any;


  monthNames: any;
  topTeams: any[];


  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private fixtureService: FixtureService,
              private teamService: TeamService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.today = new Date();
      this.allGames = [];
      this.findLiveFixtures();
      this.fillMatchLists();
      this.todayGames = [];
      this.topTeams = [];
      this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      this.findTopTeams();
    });


  }


  fillMatchLists() {
    this.fixtureService.findLeagueFixtures(Utils.LEAGUEIDS.english).subscribe(res => {
      var closeFixtures = [];
      var allFixtures = Object.values(res['api'].fixtures);

      for (let fixture of allFixtures) {

        const fiveDays = 1000 * 60 * 60 * 24 * 5;

        const gameTime = new Date(fixture['event_date']);
        const dateCeiling = new Date(this.today.getTime() + 1000 * 60 * 60 * 24 * 5);
        const dateFloor = new Date(this.today.getTime() - 1000 * 60 * 60 * 24 * 5);
        if (this.today.getTime() - gameTime.getTime() < fiveDays &&
          this.today.getTime() - gameTime.getTime() > (-1 * fiveDays)) {
          closeFixtures.push(fixture);
          this.allGames.push(fixture);
        }
      }
      this.englishGames = closeFixtures;

    });
    this.fixtureService.findLeagueFixtures(Utils.LEAGUEIDS.spanish).subscribe(res => {
      var closeFixtures = [];
      var allFixtures = Object.values(res['api'].fixtures);

      for (let fixture of allFixtures) {

        const fiveDays = 1000 * 60 * 60 * 24 * 5;

        const gameTime = new Date(fixture['event_date']);
        if (this.today.getTime() - gameTime.getTime() < fiveDays &&
          this.today.getTime() - gameTime.getTime() > (-1 * fiveDays)) {
          closeFixtures.push(fixture);
          this.allGames.push(fixture);

        }
      }
      this.spanishGames = closeFixtures;
    });
    this.fixtureService.findLeagueFixtures(Utils.LEAGUEIDS.german).subscribe(res => {
      var closeFixtures = [];
      var allFixtures = Object.values(res['api'].fixtures);

      for (let fixture of allFixtures) {

        const fiveDays = 1000 * 60 * 60 * 24 * 5;

        const gameTime = new Date(fixture['event_date']);
        if (this.today.getTime() - gameTime.getTime() < fiveDays &&
          this.today.getTime() - gameTime.getTime() > (-1 * fiveDays)) {
          closeFixtures.push(fixture);
          this.allGames.push(fixture);

        }
      }
      this.germanGames = closeFixtures;
    });
    this.fixtureService.findLeagueFixtures(Utils.LEAGUEIDS.italy).subscribe(res => {
      var closeFixtures = [];
      var allFixtures = Object.values(res['api'].fixtures);

      for (let fixture of allFixtures) {

        const fiveDays = 1000 * 60 * 60 * 24 * 5;

        const gameTime = new Date(fixture['event_date']);
        if (this.today.getTime() - gameTime.getTime() < fiveDays &&
          this.today.getTime() - gameTime.getTime() > (-1 * fiveDays)) {
          closeFixtures.push(fixture);
          this.allGames.push(fixture);

        }
      }
      this.italianGames = closeFixtures;
    });
    this.fixtureService.findLeagueFixtures(Utils.LEAGUEIDS.french).subscribe(res => {
      var closeFixtures = [];
      var allFixtures = Object.values(res['api'].fixtures);

      for (let fixture of allFixtures) {

        const fiveDays = 1000 * 60 * 60 * 24 * 5;

        const gameTime = new Date(fixture['event_date']);
        if (this.today.getTime() - gameTime.getTime() < fiveDays &&
          this.today.getTime() - gameTime.getTime() > (-1 * fiveDays)) {
          closeFixtures.push(fixture);
          this.allGames.push(fixture);

        }
      }
      this.frenchGames = closeFixtures;
    });
  }


  findLiveFixtures() {
    this.fixtureService.findLiveFixtures().subscribe(res => {
      var todaysFixtures = [];
      var recentFixtures = Object.values(res['api'].fixtures);

      for (let fixture of recentFixtures) {

        let gameTime = new Date(fixture['event_date']);

        if (gameTime.getDate() === this.today.getDate()
          && (this.today.getHours() - gameTime.getHours() > 3)
          && Utils.SUPPORTEDLEAGUES.includes(fixture['league_id'])) {
          todaysFixtures.push(fixture);
        }
      }

      this.fixtures = todaysFixtures;

      if (this.fixtures.length !== 0) {
        let hideLiveScores = document.getElementById('live-fixtures');
        hideLiveScores.style.display = 'inline';
      } else {
        let showNoLiveMatches = document.getElementById('no-live-fixtures');
        showNoLiveMatches.style.display = 'inline';
      }
    });
  }

  checkDate(date, daysFromToday) {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() - daysFromToday);
    return (this.today.getDate() === newDate.getDate());
  }

  checkTodayDate(fixture) {
    var gameTime = new Date(fixture['event_date']);
    return (this.today.getDate() === gameTime.getDate() && fixture['statusShort'] === 'NS');
  }

  adjustDate(amount) {
    var newDate = new Date(this.today.getTime());
    newDate.setDate(newDate.getDate() + amount);
    return newDate.getDate();
  }

  adjustMonth(amount) {
    var newDate = new Date(this.today.getTime());
    newDate.setDate(newDate.getDate() + amount);
    return this.monthNames[newDate.getMonth()];
  }

  adjustYear(amount) {
    var newDate = new Date(this.today.getTime());
    newDate.setDate(newDate.getDate() + amount);
    return newDate.getFullYear();
  }

  isHypeFixture(fixture) {
    console.log("tried hype")
    console.log(this.topTeams)
    let hype = this.topTeams.includes(fixture['homeTeam']) && this.topTeams.includes(fixture['awayTeam']);
    if (hype) {
      console.log('found hype' + fixture);
    }
    return hype;

  }

  findTopTeams() {
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.english).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 6; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.spanish).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 6; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.italy).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 6; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.french).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 6; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.german).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 6; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });


  }
}
