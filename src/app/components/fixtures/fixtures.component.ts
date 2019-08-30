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
  showLeagues: any;
  englishLeague = true;
  frenchLeague = true;
  spanishLeague = true;
  italianLeague = true;
  germanLeague = true;

  leagueGames: any;
  englishGames: any;
  spanishGames: any;
  germanGames: any;
  frenchGames: any;
  italianGames: any;
  allGames: any;

  earlierGames: any;
  laterGames: any;
  liveGames: any[];

  timerSubscription: any;
  daysOfWeek: any;

  matches: any;


  monthNames: any;
  topTeams: any[];
  countryFlags: any;
  logos: any;
  loadCount: number;

  futureGames = [];
  pastGames = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private fixtureService: FixtureService,
              private teamService: TeamService) {

    this.matches = {};
    this.futureGames = [1, 2, 3, 4];
    this.pastGames = [-1, -2, -3, -4];
    this.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    this.loadCount = 0;
    this.setUpMap();

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.today = new Date();
      this.today.setHours(0, 0, 0, 0);
      this.countryFlags = Utils.COUNTRYFLAGS;
      this.showLeagues = {
        '524': this.englishLeague,
        '775': this.spanishLeague,
        '525': this.frenchLeague,
        '891': this.germanLeague,
        '754': this.italianLeague
      };

      this.leagueGames = {
        524: [],
        775: [],
        525: [],
        891: [],
        754: []
      };

      this.earlierGames = [];
      this.laterGames = [];
      this.liveGames = [];

      this.allGames = [];
      this.logos = Utils.TEAMLOGOS;
      this.findTodaysFixtures();
      this.populateMatches();

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

          if (differenceInTime < Utils.FIVEDAYSMS && differenceInTime > (-1 * Utils.FIVEDAYSMS)) {
            this.matches[Math.floor(differenceInTime / Utils.ONEDAYMS)].push(fixture);
            this.leagueGames[league].push(fixture);
            this.allGames.push(fixture);
          }
        }
        this.loadCount += 1;
      });
    }
    console.log(this.matches)
  }


  findTodaysFixtures() {
    let updatedEarlierGames = [];
    let updatedLaterGames = [];
    let updatedLiveGames = [];



    let dateString = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
    this.fixtureService.findTodaysFixtures(dateString).subscribe(res => {

      let games = Object.values(res['api'].fixtures);

      for (let game of games) {

        let gameTime = new Date(game['event_date']);

        if (gameTime.getDate() === this.today.getDate()
          && Utils.SUPPORTEDLEAGUES.includes(parseInt(game['league_id'], 10))) {

          if (game['statusShort'] === 'NS') {
            updatedLaterGames.push(game);
          } else if (game['statusShort'] === 'FT') {
            updatedEarlierGames.push(game);
          } else {
            updatedLiveGames.push(game);
          }
        }
      }

      updatedLiveGames.sort((a, b) => {
        let aTime = parseInt(a['elapsed'], 10);
        let bTime = parseInt(b['elapsed'], 10);
        if (a['statusShort'] == 'HT'){
          aTime = 45;
        }
        if (b['statusShort'] == 'HT'){
          bTime = 45;
        }

        return bTime - aTime;
      });

      updatedLaterGames.sort((a, b) => {
        return parseInt(b['event_timestamp'], 10) - parseInt(a['event_timestamp'], 10);
      });
      updatedEarlierGames.sort((a, b) => {
        return parseInt(b['event_timestamp'], 10) - parseInt(a['event_timestamp'], 10);
      });

      this.liveGames = updatedLiveGames;
      this.earlierGames = updatedEarlierGames;
      this.laterGames = updatedLaterGames;

      // refreshes today's scores every minute
      this.subscribeToData();
      console.log(this.matches)
    });
  }

  private subscribeToData(): void {
    console.log('Refreshing live fixtures!');
    this.timerSubscription = timer$.subscribe(() => this.findTodaysFixtures());
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

  earlierToday(fixture) {
    var gameTime = new Date(fixture['event_date']);
    return (this.today.getDate() === gameTime.getDate() && fixture['statusShort'] === 'FT');
  }

  adjustDayOfWeek(amount) {
    var newDate = new Date(this.today.getTime());
    newDate.setDate(newDate.getDate() + amount);
    return this.daysOfWeek[newDate.getDay()];
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

    if (this.topTeams.includes(fixture['homeTeam']) && this.topTeams.includes(fixture['awayTeam'])) {
      return 'hype-fixture';
    }
    return '';
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

    if (fixture['statusShort'] === 'HT') {
      return 'HT';
    }

    return fixture['elapsed'] + '\'';
  }

  checkIfDone(fixture) {
    var date = new Date(fixture['event_date']);
    return fixture['statusShort'] === 'FT' && date.getDate() === this.today.getDate();
  }


  findLogo(teamID) {
    return this.logos[parseInt(teamID, 10)];
  }

  filterBy(prop: string, num: number) {

    return this.matches[num].sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);

  }

  toggleEnglishLeague() {
    if (this.englishLeague) {
      this.englishLeague = false;
      this.showLeagues[Utils.LEAGUEIDS.english.toString()] = false;
    } else {
      this.englishLeague = true;
      this.showLeagues[Utils.LEAGUEIDS.english.toString()] = true;
    }
  }

  toggleSpanishLeague() {
    if (this.spanishLeague) {
      this.spanishLeague = false;
      this.showLeagues[Utils.LEAGUEIDS.spanish.toString()] = false;
    } else {
      this.spanishLeague = true;
      this.showLeagues[Utils.LEAGUEIDS.spanish.toString()] = true;
    }
  }

  toggleGermanLeague() {
    if (this.germanLeague) {
      this.germanLeague = false;
      this.showLeagues[Utils.LEAGUEIDS.german.toString()] = false;
    } else {
      this.germanLeague = true;
      this.showLeagues[Utils.LEAGUEIDS.german.toString()] = true;
    }
  }

  toggleItalianLeague() {
    if (this.italianLeague) {
      this.italianLeague = false;
      this.showLeagues[Utils.LEAGUEIDS.italy.toString()] = false;
    } else {
      this.italianLeague = true;
      this.showLeagues[Utils.LEAGUEIDS.italy.toString()] = true;
    }
  }

  toggleFrenchLeague() {
    if (this.frenchLeague) {
      this.frenchLeague = false;
      this.showLeagues[Utils.LEAGUEIDS.french.toString()] = false;
    } else {
      this.frenchLeague = true;
      this.showLeagues[Utils.LEAGUEIDS.french.toString()] = true;
    }
  }

  leagueShowing(leagueid) {
    return this.showLeagues[leagueid];
  }
}
