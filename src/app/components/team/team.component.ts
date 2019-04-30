import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {TeamService} from '../../services/teamService/team.service';
import {Utils} from "../../../assets/utils";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamId: number;
  team: any;
  allMatches: any;
  pastMatches: any;
  upcomingMatches: any;
  roster: any;
  teamData: any;
  leagueId: number;
  liveFixture: any;
  logos: any;
  countryFlags: any;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private teamService: TeamService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamId = params['teamId'];
      this.liveFixture = {};
      this.findTeamDetails(this.teamId);
      this.findAllTeamMatches(this.teamId);
      this.findRoster(this.teamId);
      this.findLiveFixtures();
      this.logos = Utils.TEAMLOGOS;
      this.countryFlags = Utils.COUNTRYFLAGS;
    });
  }

  findTeamDetails(tid) {

    this.team = {
      name: '',
      logo: ''
    };

    this.teamService.findTeamDetails(tid).subscribe(res => {
      this.teamData = res;
      console.log(res);
      this.team['name'] = this.teamData.api.teams[tid].name;
      this.team['logo'] = this.teamData.api.teams[tid].logo;
    });

  }

  findAllTeamMatches(teamId) {
    this.teamService.findTeamFixtures(teamId).subscribe(res => {
      this.allMatches = res;

      if (res['api'].fixtures != {}) {
        this.leagueId = res['api'].fixtures[Object.keys(res['api'].fixtures)[0]].league_id;
      }

      this.pastMatches = [];
      this.upcomingMatches = [];

      let today = new Date();
      console.log(this.allMatches);
      const entries = Object.entries(this.allMatches.api.fixtures);
      for (let [x, y] of entries) {
        if (today < new Date(y['event_date'])) {
          this.upcomingMatches.push(y);
        } else {
          this.pastMatches.push(y);
        }
      }


      this.upcomingMatches.sort((a, b) => {
        return parseInt(a['event_timestamp'], 10) - parseInt(b['event_timestamp'], 10);
      });

      this.pastMatches.sort((a, b) => {
        return parseInt(b['event_timestamp'], 10) - parseInt(a['event_timestamp'], 10);
      });
      this.findTeamLeagueStanding(this.leagueId);
    });

  }

  findRoster(teamId) {
    this.roster = {
      'api': {
        'results': 37,
        'coachs': [
          'Unai Emery'
        ],
        'players': [
          {
            'number': '19',
            'player': 'Bernd Leno'
          },
          {
            'number': '5',
            'player': 'Sokratis Papastathopoulos'
          },
          {
            'number': '16',
            'player': 'Rob Holding'
          },
          {
            'number': '20',
            'player': 'Shkodran Mustafi'
          },
          {
            'number': '2',
            'player': 'Hector Bellerin'
          },
          {
            'number': '7',
            'player': 'Henrikh Mkhitaryan'
          },
          {
            'number': '11',
            'player': 'Lucas Torreira'
          },
          {
            'number': '17',
            'player': 'Alex Iwobi'
          },
          {
            'number': '31',
            'player': 'Sead Kolasinac'
          },
          {
            'number': '34',
            'player': 'Granit Xhaka'
          },
          {
            'number': '14',
            'player': 'Pierre-emerick Aubameyang'
          },
          {
            'number': '1',
            'player': 'Petr Cech'
          },
          {
            'number': '4',
            'player': 'Mohamed El Nenny'
          },
          {
            'number': '8',
            'player': 'Aaron Ramsey'
          },
          {
            'number': '10',
            'player': 'Mesut Ozil'
          },
          {
            'number': '15',
            'player': 'Ainsley Maitland-niles'
          },
          {
            'number': '29',
            'player': 'Matteo Guendouzi Olie'
          },
          {
            'number': '49',
            'player': 'Edward Nketiah'
          },
          {
            'number': '',
            'player': 'Alexandre Lacazette'
          },
          {
            'number': '',
            'player': 'Stephan Lichtsteiner'
          },
          {
            'number': '',
            'player': 'Ainsley Maitland-Niles'
          },
          {
            'number': '',
            'player': 'Laurent Koscielny'
          },
          {
            'number': '',
            'player': 'Nacho Monreal'
          },
          {
            'number': '',
            'player': 'Bukayo Saka'
          },
          {
            'number': '69',
            'player': 'Joseph Willock'
          },
          {
            'number': '25',
            'player': 'Carl Jenkinson'
          },
          {
            'number': '27',
            'player': 'Konstantinos Mavropanos'
          },
          {
            'number': '',
            'player': 'Denis Suarez'
          },
          {
            'number': '55',
            'player': 'Emile Smith-rowe'
          },
          {
            'number': '26',
            'player': 'Emiliano Martinez'
          },
          {
            'number': '47',
            'player': 'Charlie Gilmour'
          },
          {
            'number': '47',
            'player': 'Zech Medley'
          },
          {
            'number': '3',
            'player': 'Jordi Osei-tutu'
          },
          {
            'number': '72',
            'player': 'Tyreece John-jules'
          },
          {
            'number': '',
            'player': 'Dejan Iliev'
          },
          {
            'number': '',
            'player': 'Tyreece John-Jules'
          }
        ]
      }
    };

    this.teamService.findTeamRoster(teamId).subscribe(res => {

      if(res != null){
        this.roster = res;
      }

    });
  }


  findTeamLeagueStanding(leagueId) {
    this.teamService.findLeagueStandings(leagueId).subscribe(res => {
      let leagueStandings = res['api'].standings[0];

      for (let team of leagueStandings) {
        if (team.team_id == this.teamId) {
          this.team['leagueStanding'] = team.rank;
          console.log(this.team['leagueStanding']);
        }
      }
    });
  }

  findLiveFixtures() {
    this.teamService.findLiveFixtures().subscribe(res => {

      let allLiveFixtures = Object.values(res['api'].fixtures);

      for (let fixture of allLiveFixtures) {
        if (fixture['homeTeam_id'] == this.teamId || fixture['awayTeam_id'] == this.teamId) {
          this.liveFixture = fixture;
          console.log(this.liveFixture);
        }
      }
    });
  }
}




