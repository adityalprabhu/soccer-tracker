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
  englishLeague: boolean;
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
  countryFlags: any;
  logos: any;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private fixtureService: FixtureService,
              private teamService: TeamService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.today = new Date();
      this.countryFlags = Utils.COUNTRYFLAGS;

      this.allGames = [];
      this.logos = Utils.TEAMLOGOS;
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
      let closeFixtures = [];
      let allFixtures = Object.values(res['api'].fixtures);

      for (let fixture of allFixtures) {

        const numberOfDays = 5;
        const fiveDaysMS = 1000 * 60 * 60 * 24 * numberOfDays;

        const gameTime = new Date(fixture['event_date']);

        if (this.today.getTime() - gameTime.getTime() < fiveDaysMS &&
          this.today.getTime() - gameTime.getTime() > (-1 * fiveDaysMS)) {
          closeFixtures.push(fixture);
          this.allGames.push(fixture);
        }
      }
      this.englishGames = closeFixtures;
      this.allGames.sort((a, b) => {
        return parseInt(a['event_timestamp'], 10) - parseInt(b['event_timestamp'], 10);
      });

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
      this.allGames.sort((a, b) => {
        return parseInt(a['event_timestamp'], 10) - parseInt(b['event_timestamp'], 10);
      });
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
      this.allGames.sort((a, b) => {
        return parseInt(a['event_timestamp'], 10) - parseInt(b['event_timestamp'], 10);
      });
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
      this.allGames.sort((a, b) => {
        return parseInt(a['event_timestamp'], 10) - parseInt(b['event_timestamp'], 10);
      });
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
      this.allGames.sort((a, b) => {
        return parseInt(a['event_timestamp'], 10) - parseInt(b['event_timestamp'], 10);
      });
    });

  }


  findLiveFixtures() {
    this.fixtureService.findLiveFixtures().subscribe(res => {
      var todaysFixtures = [];
      var recentFixtures = Object.values(res['api'].fixtures);
      console.log(recentFixtures);

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
      this.fixtures = todaysFixtures;

      console.log(this.fixtures);

      if (todaysFixtures.length !== 0) {
        let showLiveScores = document.getElementById('live-fixtures');
        showLiveScores.style.display = 'inline';
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

    // var bool = this.topTeams.includes(fixture['homeTeam']) && this.topTeams.includes(fixture['awayTeam']);

    return this.topTeams.includes(fixture['homeTeam']) && this.topTeams.includes(fixture['awayTeam']);
    ;

  }

  findTopTeams() {
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.english).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 7; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.spanish).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 4; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.italy).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 5; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.french).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 5; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.german).subscribe(res => {
      let leagueStandings = res['api'].standings[0];
      for (let i = 0; i < 5; i++) {
        this.topTeams.push(leagueStandings[i]['teamName']);
      }
    });
  }


  getTime(fixture) {
    if (fixture['statusShort'] === 'NS') {
      var date = new Date(fixture['event_date']);
      var dateString = date.toTimeString().substr(0, 5);

      return dateString;
    }

    return fixture['elapsed'] + '\'';
  }

  checkIfDone(fixture) {
    var date = new Date(fixture['event_date']);
    return fixture['statusShort'] === 'FT' && date.getDate() === this.today.getDate();
  }

  toggleEnglishLeague() {

    if (this.englishLeague) {
      console.log('filtering english games');
      this.englishLeague = false;
    } else {
      console.log('adding english games');
      this.englishLeague = true;

    }
  }

  getLogo(teamID) {
    this.teamService.findLeagueStandings(Utils.LEAGUEIDS.german).subscribe(res => {
      return res;
    });
  }

  findLogo(teamID) {
    return this.logos[parseInt(teamID, 10)];
  }
}
