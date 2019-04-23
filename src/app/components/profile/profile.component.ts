import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {ProfileService} from '../../services/profileService/profile.service';
import {Utils} from '../../../assets/utils';
import {TeamService} from '../../services/teamService/team.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: any;
  user: any;
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  teams: any;
  teamLogos: any;
  leagueLogos: any;
  team: any;
  teamNames: any;

  teamsMapByLeague = {'English': {}, 'Spanish': {}, 'French': {}, 'German': {}, 'Italian': {}};

  leagueIds = {'English': 2, 'Spanish': 87, 'French': 4, 'German': 8, 'Italian': 94};

  addLeague: any;
  addTeamId: any;
  addTeamName: any;

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

    this.findTeamsByLeague(this.leagueIds['English'], 'English');
    this.findTeamsByLeague(this.leagueIds['French'], 'French');
    this.findTeamsByLeague(this.leagueIds['Spanish'], 'Spanish');
    this.findTeamsByLeague(this.leagueIds['German'], 'German');
    this.findTeamsByLeague(this.leagueIds['Italian'], 'Italian');

    this.addLeague = 'Select League';
    this.addTeamName = 'Select Team';
    this.addTeamId = null;
  }

  findTeamsByLeague(leagueId, leagueName) {
    this.teamService.findTeamsByLeagueId(leagueId).subscribe(res => {
      this.teamsMapByLeague[leagueName] = Object.values(res['api']['teams']);
    });
  }

  setAddLeague(leagueName) {
    this.addLeague = leagueName;
  }

  setAddTeam(teamId, teamName) {
    this.addTeamId = teamId;
    this.addTeamName = teamName;

    console.log(teamId);
    console.log(teamName);
  }

  update() {
    const user = {
      _id: this.userId,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      teams: this.teams
    };

    this.profileService.updateUser(this.userId, user).subscribe(res => {
      console.log(res);
      this.getCurrentUser();
    });
  }

  removeTeam(teamId) {
    // remove team
    this.teams = this.teams.filter(team => team !== teamId);

    // update db
    this.update();
  }

  addTeam() {

    if (this.addTeamId !== null) {
      this.teams.push(this.addTeamId);

      this.update();
    }
  }

  logout() {
    this.profileService.logout().subscribe(res => {
      console.log(res);
      this.router.navigate(['/']);
    });
  }

  getCurrentUser() {
    this.profileService.findCurrentUser()
      .subscribe(res => {
        console.log(res);
        this.user = res;

        this.userId = this.user._id;
        this.email = this.user.email;
        this.password = this.user.password;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.teams = this.user.teams;

        this.findTeamNames(this.teams);
        // this.findTeamsDetails(this.favoriteTeam);
        // this.findLeagueId(this.favoriteTeam);

      });
  }

  findTeamNames(teamIds) {

    this.teamNames = {};

    for (let i = 0; i < teamIds.length; i++) {
      this.teamService.findTeamDetails(teamIds[i]).subscribe(res => {
        this.teamNames[teamIds[i]] = res.api.teams[teamIds[i].toString()].name;
      });
    }
  }

  // findTeamsDetails(tid) {
  //
  //   this.favTeamData = {
  //     name: '',
  //
  //   };
  //
  //   this.teamService.findTeamDetails(tid).subscribe(res => {
  //     this.teamData = res;
  //     this.favTeamData['name'] = this.teamData.api.teams[tid].name;
  //   });
  // }

  // findLeagueId(teamId) {
  //   this.teamService.findTeamFixtures(teamId).subscribe(res => {
  //
  //     if (res['api'].fixtures != {}) {
  //       this.leagueId = res['api'].fixtures[Object.keys(res['api'].fixtures)[0]].league_id;
  //
  //       this.findLeagueStandings(this.leagueId);
  //       this.findTeamStats(this.leagueId, teamId);
  //     }
  //   });
  // }

  // findLeagueStandings(leagueId) {
  //   this.teamService.findLeagueStandings(leagueId).subscribe(res => {
  //     let leagueStandings = res['api'].standings[0];
  //
  //     for (let team of leagueStandings) {
  //       if (team.team_id == this.favoriteTeam) {
  //         this.favTeamData['leagueStanding'] = team.rank;
  //       }
  //     }
  //   });
  // }
  //
  // findTeamStats(leagueId, teamId) {
  //   this.teamService.findTeamStats(leagueId, teamId).subscribe(res => {
  //
  //     this.favTeamData['matchesPlayed'] = res['api']['stats']['matchs']['matchsPlayed']['total'];
  //     this.favTeamData['wins'] = res['api']['stats']['matchs']['wins']['total'];
  //     this.favTeamData['draws'] = res['api']['stats']['matchs']['draws']['total'];
  //     this.favTeamData['losses'] = res['api']['stats']['matchs']['loses']['total'];
  //     this.favTeamData['goalsFor'] = res['api']['stats']['goals']['goalsFor']['total'];
  //     this.favTeamData['goalsAgainst'] = res['api']['stats']['goals']['goalsAgainst']['total'];
  //   });
  // }

}
