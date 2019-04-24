import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {ProfileService} from '../../services/profileService/profile.service';
import {Utils} from '../../../assets/utils';
import {TeamService} from '../../services/teamService/team.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileUserId: any;
  isLoggedInUser: boolean;
  userId: any;
  user: any;
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  manager: any;
  teams: any;
  teamLogos: any;
  leagueLogos: any;
  team: any;
  teamNames: any;
  teamsByLeagueId: any;

  teamsMapByLeague = {'English': {}, 'Spanish': {}, 'French': {}, 'German': {}, 'Italian': {}};

  leagueIds = {'English': 2, 'Spanish': 87, 'French': 4, 'German': 8, 'Italian': 94};
  leagueNames = {2: 'English', 87: 'Spanish', 4: 'French', 8: 'German', 94: 'Italian'};


  addLeague: any;
  addTeamId: any;
  addTeamName: any;

  teamsLeagueStandings = {};
  teamsLeagueIds = {};
  teamsLeagueNames = {};
  teamsMatchesPlayed = {};
  teamsWins = {};
  teamsDraws = {};
  teamsLosses = {};

  leagueId;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private profileService: ProfileService,
              private teamService: TeamService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profileUserId = params['userId'];
      console.log("HERE")

      console.log(this.profileUserId)
      console.log("HERE")

      this.isLoggedInUser = true;
      if(this.profileUserId == null){
        this.getCurrentUser();
      } else {
        this.isLoggedInUser = false;
        this.getOtherUser();
      }
    });

    this.teamLogos = Utils.TEAMLOGOS;
    this.leagueLogos = Utils.LEAGUELOGOS;
    this.teamsByLeagueId = Utils.TEAMSBYLEAGUEID;

    this.findTeamsByLeague(this.leagueIds['English'], 'English');
    this.findTeamsByLeague(this.leagueIds['French'], 'French');
    this.findTeamsByLeague(this.leagueIds['Spanish'], 'Spanish');
    this.findTeamsByLeague(this.leagueIds['German'], 'German');
    this.findTeamsByLeague(this.leagueIds['Italian'], 'Italian');

    this.addLeague = 'Select League';
    this.addTeamName = 'Select Team';
    this.addTeamId = null;
  }

  getOtherUser(){
    this.profileService.findUserById(this.profileUserId)
      .subscribe(res => {
          if (isNullOrUndefined(res)) {
            this.router.navigate(['/profile']);
          }

          let user = res;
          console.log(user)

          this.userId = user['_id'];
          this.firstName = user['firstName'];
          this.lastName = user['lastName'];
          this.teams = user['teams'];
          console.log(user['teams']);
          this.manager = user['manager'];

          this.findTeamNames(this.teams);
          this.findTeamsStandings(this.teams);
          this.findTeamsStats(this.teams);
        }


        )
  }

  getCurrentUser() {
    this.profileService.findCurrentUser()
      .subscribe(res => {
        if(isNullOrUndefined(res)) {
          this.router.navigate(['/login']);
        }


        this.user = res;

        this.userId = this.user._id;
        this.email = this.user.email;
        this.password = this.user.password;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.teams = this.user.teams;
        this.manager = this.user.manager;


        this.findTeamNames(this.teams);
        this.findTeamsStandings(this.teams);
        this.findTeamsStats(this.teams);
      });
  }

  findTeamsStats(teamIds) {

    for (let i = 0; i < teamIds.length; i++) {

      let leagueId = this.teamsLeagueIds[teamIds[i]];

      this.teamService.findTeamStats(leagueId, teamIds[i]).subscribe(res => {

        this.teamsMatchesPlayed[teamIds[i]] = res['api']['stats']['matchs']['matchsPlayed']['total'];
        this.teamsWins[teamIds[i]] = res['api']['stats']['matchs']['wins']['total'];
        this.teamsDraws[teamIds[i]] = res['api']['stats']['matchs']['draws']['total'];
        this.teamsLosses[teamIds[i]] = res['api']['stats']['matchs']['loses']['total'];
      });
    }
  }

  findTeamsStandings(teamIds) {
    for (let i = 0; i < teamIds.length; i++) {

      let leagueId = this.findLeagueId(teamIds[i]);

      this.teamsLeagueIds[teamIds[i]] = leagueId;

      this.teamService.findLeagueStandings(leagueId).subscribe(res => {
        let leagueStandings = res['api'].standings[0];

        for (let team of leagueStandings) {
          if (team.team_id === teamIds[i]) {
            this.teamsLeagueStandings[teamIds[i]] = team.rank;
          }
        }
      });
    }
  }

  findLeagueId(teamId) {
    for (const key in this.teamsByLeagueId) {
      if (this.teamsByLeagueId[key].includes(teamId.toString())){
        return key;
      }
    }
  }

  findTeamsByLeague(leagueId, leagueName) {
    this.teamService.findTeamsByLeagueId(leagueId).subscribe(res => {
      this.teamsMapByLeague[leagueName] = Object.values(res['api'].teams);
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
      teams: this.teams,
      manager: this.manager
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


  findTeamNames(teamIds) {

    this.teamNames = {};

    for (let i = 0; i < teamIds.length; i++) {
      this.teamService.findTeamDetails(teamIds[i]).subscribe(res => {
        this.teamNames[teamIds[i]] = res['api'].teams[teamIds[i].toString()].name;
      });
    }
  }

  // findLeagueStanding(leagueId, teamId) {
  //
  //   let rank = '2';
  //
  //   this.teamService.findLeagueStandings(leagueId).subscribe(res => {
  //     let leagueStandings = res['api'].standings[0];
  //
  //     for (let team of leagueStandings) {
  //       if (team.team_id === teamId) {
  //         let rank = team.rank;
  //         return rank;
  //       }
  //     }
  //   });
  // }

  //
  // findTeamsByLeagues(leagueId) {
  //   this.findTeamsByLeague()
  // }

  // findLeagueId(teamId) {
  //   this.teamService.findTeamFixtures(teamId).subscribe(res => {
  //
  //     if (res['api'].fixtures != {}) {
  //       this.leagueId = res['api'].fixtures[Object.keys(res['api'].fixtures)[0]].league_id;
  //       //
  //       // this.findLeagueStandings(this.leagueId);
  //       // this.findTeamStats(this.leagueId, teamId);
  //       console.log(this.leagueId);
  //
  //     }
  //   });
  //
  //   return this.leagueId;
  //
  // }
  //

  //
  //
  //


}
