import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../services/teamService/team.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {Utils} from "../../../assets/utils";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  leagues = [
    {
      name:'English',
      id: 2
    },
    {
      name:'Spanish',
      id: 87
    },
    {
      name:'French',
      id: 4
    },
    {
      name:'German',
      id: 8
    },
    {
      name:'Italian',
      id: 94
    }];
  searchCriteria: any;
  teams: any;
  leagueResults: any;
  teamResults: any;
  userResults: any;
  logos: any;


  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchCriteria = params['searchCriteria'];
      this.teams = [];
      this.logos = Utils.TEAMLOGOS
      this.logos = Object.assign({}, this.logos, Utils.LEAGUELOGOS);
      this.findAllTeams();
    });

  }

  findAllTeams() {
    let count = this.leagues.length;
    this.teams = localStorage.getItem("allTeams");

    if (isNullOrUndefined(this.teams)) {
      for (let league of this.leagues) {

        this.teamService.findTeamsByLeagueId(league.id).subscribe(res => {
          this.teams = this.teams.concat(Object.values(res['api'].teams));
          count--;
          if (count == 0) {
            console.log(this.teams);
            localStorage.setItem("allTeams", JSON.stringify(this.teams))
            this.search()
          }
        });

      }
    }else{
      this.search();
    }
  }

  search(){
    this.leagueResults = this.leagues.filter(value => {
      return value.name.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0;
    });

    this.teams = JSON.parse(this.teams);
    console.log(this.teams)
    this.teamResults = this.teams.filter(value => {
      return value.name.toLowerCase().indexOf(this.searchCriteria.toLowerCase()) >= 0;
    });

    var teamId="";

    if(teamId!=""){
      this.teamService.findUsersByTeams(teamId).subscribe(res => {
        console.log(res)
      })

    }
    // console.log(this.results)
  }

}
