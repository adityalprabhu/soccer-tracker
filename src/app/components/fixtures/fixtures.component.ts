import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FixtureService} from '../../services/fixtureService/fixture.service';
import {Utils} from '../../../assets/utils';
import {element} from 'protractor';
import {TeamService} from '../../services/teamService/team.service';
import {Observable} from 'rxjs';
import {timer} from 'rxjs';

let timer$ = timer(60000);


@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {


  fixtures: any;
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
  timerSubscription: any;

  matches: any;


  monthNames: any;
  topTeams: any[];
  countryFlags: any;
  logos: any;

  futureGames = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private fixtureService: FixtureService,
              private teamService: TeamService) {

    this.matches = {};
    this.futureGames = [1,2,3,4]
    this.setUpMap();

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.today = new Date();
      this.countryFlags = Utils.COUNTRYFLAGS;


      this.allGames = [];
      this.logos = Utils.TEAMLOGOS;
      this.findLiveFixtures();
      this.populateMatches();

      this.fillMatchLists();
      this.todayGames = [];
      this.topTeams = [];
      this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      this.findTopTeams();
    });


  }

  setUpMap() {
    for (let i = -5; i < 6; i++) {
      this.matches[i] = [];
    }

  }


  populateMatches() {
    for (let league of Utils.SUPPORTEDLEAGUES) {

      this.fixtureService.findLeagueFixtures(league).subscribe(res => {

        let allFixtures = Object.values(res['api'].fixtures);
        for (let fixture of allFixtures) {

          const gameTime = new Date(fixture['event_date']);
          let differenceInTime = gameTime.getTime() - this.today.getTime();

          if (differenceInTime < Utils.FIVEDAYSMS &&
            differenceInTime > (-1 * Utils.FIVEDAYSMS)) {

            this.matches[Math.floor(differenceInTime / Utils.ONEDAYMS)].push(fixture);

          }

        }

      });
    }
  }

  fillMatchLists() {
    this.fixtureService.findLeagueFixtures(Utils.LEAGUEIDS.english).subscribe(res => {
      let closeFixtures = [];
      let allFixtures = Object.values(res['api'].fixtures);

      for (let fixture of allFixtures) {

        const gameTime = new Date(fixture['event_date']);

        if (this.today.getTime() - gameTime.getTime() < Utils.FIVEDAYSMS &&
          this.today.getTime() - gameTime.getTime() > (-1 * Utils.FIVEDAYSMS)) {

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
      this.fixtures = todaysFixtures;


      this.subscribeToData();

      if (todaysFixtures.length !== 0) {
        let showLiveScores = document.getElementById('live-fixtures');
        showLiveScores.style.display = 'inline';
      } else {
        let showNoLiveMatches = document.getElementById('no-live-fixtures');
        showNoLiveMatches.style.display = 'inline';
      }
    });
  }

  private subscribeToData(): void {
    console.log('Refreshing live fixtures!');
    this.timerSubscription = timer$.subscribe(() => this.findLiveFixtures());
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

    return this.topTeams.includes(fixture['homeTeam']) && this.topTeams.includes(fixture['awayTeam']);


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
      this.englishLeague = false;
    } else {
      this.englishLeague = true;

    }
  }

  findLogo(teamID) {
    return this.logos[parseInt(teamID, 10)];
  }

  filterBy(prop: string, num: number) {
    return this.matches[num].sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }
}
