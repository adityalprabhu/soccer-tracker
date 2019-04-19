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
  leagueStandings;
  leagueDetails;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private teamService: TeamService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params.leagueId;
    });

    this.findLeagueStandings(this.leagueId);
    this.findLeagueDetails(this.leagueId);
  }

  findLeagueStandings(leagueId) {
    this.teamService.findLeagueStandings(leagueId).subscribe(res => {
      this.leagueStandings = res['api'].standings[0];
    });
  }

  findLeagueDetails(leagueId) {
    this.teamService.findLeagueDetails(leagueId).subscribe(res => {
      this.leagueDetails = res['api']['leagues'][leagueId];
      console.log(this.leagueDetails);
    });
  }

}
