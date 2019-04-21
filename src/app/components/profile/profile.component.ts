import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {ProfileService} from '../../services/profileService/profile.service';
import {Utils} from '../../../assets/utils';
import {TeamService} from "../../services/teamService/team.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  favoriteTeam: any;
  teams: any;
  teamLogos: any;
  leagueLogos: any;
  favTeamData: any;
  team: any;
  leagueId: any;

  teamData;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private profileService: ProfileService,
              private teamService: TeamService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCurrentUser();
    });

    this.teamLogos = Utils.TEAMLOGOS;
    this.leagueLogos = Utils.LEAGUELOGOS;


  }

  getCurrentUser() {
    this.profileService.findCurrentUser()
      .subscribe(res => {
        this.user = res;

        this.email = this.user.email;
        this.password = this.user.password;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.favoriteTeam = this.user.favoriteTeam;
        this.teams = this.user.teams;

        this.findTeamsDetails(this.favoriteTeam);
        this.findLeagueId(this.favoriteTeam);
      });
  }

  findTeamsDetails(tid) {

    this.favTeamData = {
      name: '',

    };

    this.teamService.findTeamDetails(tid).subscribe(res => {
      this.teamData = res;
      this.favTeamData['name'] = this.teamData.api.teams[tid].name;
    });
  }

  findLeagueId(teamId) {
    this.teamService.findTeamFixtures(teamId).subscribe(res => {

      if (res['api'].fixtures != {}) {
        this.leagueId = res['api'].fixtures[Object.keys(res['api'].fixtures)[0]].league_id;

        this.findLeagueStandings(this.leagueId);
        this.findTeamStats(this.leagueId, teamId);
      }
    });
  }

  findLeagueStandings(leagueId) {
    this.teamService.findLeagueStandings(leagueId).subscribe(res => {
      let leagueStandings = res['api'].standings[0];

      for (let team of leagueStandings) {
        if (team.team_id == this.favoriteTeam) {
          this.favTeamData['leagueStanding'] = team.rank;
        }
      }
    });
  }

  findTeamStats(leagueId, teamId) {
    this.teamService.findTeamStats(leagueId, teamId).subscribe(res => {

      this.favTeamData['matchesPlayed'] = res['api']['stats']['matchs']['matchsPlayed']['total'];
      this.favTeamData['wins'] = res['api']['stats']['matchs']['wins']['total'];
      this.favTeamData['draws'] = res['api']['stats']['matchs']['draws']['total'];
      this.favTeamData['losses'] = res['api']['stats']['matchs']['loses']['total'];
      this.favTeamData['goalsFor'] = res['api']['stats']['goals']['goalsFor']['total'];
      this.favTeamData['goalsAgainst'] = res['api']['stats']['goals']['goalsAgainst']['total'];
    });
  }
}
