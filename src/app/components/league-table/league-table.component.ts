import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../services/teamService/team.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']

})
export class LeagueTableComponent implements OnInit {

  leagueId;
  leagueName;
  leagueSeasonNext;
  leagueStandings;
  leagueDetails;
  // teamLogos;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private teamService: TeamService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params.leagueId;
    });

    // this.teamLogos = {};

    this.findLeagueStandings(this.leagueId);
    this.findLeagueDetails(this.leagueId);
    this.findLeagueName(this.leagueId);
    // this.findTeamLogoURLS();
  }

  findLeagueName(leagueId) {
    if (leagueId === '2') {
      this.leagueName = 'English';
    } else if (leagueId === '4') {
      this.leagueName = 'French';
    } else if (leagueId === '87') {
      this.leagueName = 'Spanish';
    } else if (leagueId === '8') {
      this.leagueName = 'German';
    } else if (leagueId === '94') {
      this.leagueName = 'Italian';
    } else {
      this.leagueName = '';
    }
  }

  findLeagueStandings(leagueId) {
    this.teamService.findLeagueStandings(leagueId).subscribe(res => {
      this.leagueStandings = res['api'].standings[0];
    });
  }

  findLeagueDetails(leagueId) {
    this.teamService.findLeagueDetails(leagueId).subscribe(res => {
      this.leagueDetails = res['api']['leagues'][leagueId];
      this.leagueSeasonNext = parseInt(this.leagueDetails.season, 10) + 1;
    });
  }

  // findTeamLogoURLS() {
  //
  //   const teamIds = ['40', '50', '47', '42', '49', '33', '46', '39',
  //     '45', '38', '48', '35', '52', '44', '34', '41', '51', '43', '36', '37',
  //     '85', '79', '80', '1063', '81', '82', '93', '84', '95', '92',
  //     '94', '77', '78', '83', '96', '91', '87', '89', '90', '88',
  //     '157', '165', '173', '169', '163', '167', '162', '168', '161',
  //     '158', '159', '164', '160', '170', '174', '172', '171', '166',
  //     '529', '530', '541', '536', '546', '532', '531', '542', '543',
  //     '548', '537', '540', '545', '547', '533', '539', '720', '538', '728', '726',
  //     '496', '492', '505', '489', '497', '499', '487', '503', '498',
  //     '502', '488', '490', '493', '523', '495', '494', '500', '511', '512', '491'];
  //
  //   for (let i = 0; i < teamIds.length; i++) {
  //     this.teamService.findTeamDetails(teamIds[i]).subscribe(res => {
  //       this.teamLogos[teamIds[i]] = res['api']['teams'][teamIds[i]]['logo'];
  //
  //       console.log(this.teamLogos);
  //
  //     });
  //   }
  // }

}
