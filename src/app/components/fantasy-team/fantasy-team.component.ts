import { Component, OnInit } from '@angular/core';
import {isNullOrUndefined} from "util";
import {TeamService} from "../../services/teamService/team.service";
import {ProfileService} from "../../services/profileService/profile.service";

@Component({
  selector: 'app-fantasy-team',
  templateUrl: './fantasy-team.component.html',
  styleUrls: ['./fantasy-team.component.css']
})
export class FantasyTeamComponent implements OnInit {
  sample: any;
  leagues = {'Select League': 0, 'English': 2, 'Spanish': 87, 'French': 4, 'German': 8, 'Italian': 94};
  teams: any;
  players: any;
  positions = {'Goalkeeper' : 'goalkeepers', 'Defender':'defenders', 'Midfielder':'midfielders', 'Striker':'strikers'};
  fantasyTeam: any;
  selectedLeague: any;
  selectedTeam: any;
  selectedPlayer: any;
  selectedPosition: any;
  disableTeams: boolean;
  disablePlayer: boolean;
  disablePosition: boolean;
  newTeam: boolean;


  constructor(private teamService: TeamService,
              private profileService: ProfileService) {
    this.sample = ["1","2","3"]
  }

  ngOnInit() {
    this.disableTeams = true;
    this.disablePlayer = true;
    this.disablePosition= true;
    this.selectedPosition = 'goalkeepers';
    this.selectedLeague = 0;
    this.fantasyTeam = {
      name: "",
      goalkeepers: [],
      strikers: [],
      midfielders: [],
      defenders: [],
      subs: [],
      manager: ""
    }

    this.findFantasyTeamByManager();
  }

  onSelectLeague(leagueId) {

    console.log(this.selectedLeague)
    if(leagueId == 0){
      this.disablePosition = true;
      this.disablePlayer = true;
      this.disableTeams = true;
    }else{
      this.disableTeams = true;

      let cached = localStorage.getItem("league"+leagueId);
      if(isNullOrUndefined(cached)){
        this.findTeamForLeague(leagueId);
      }else{
        this.teams = JSON.parse(cached);
        this.onSelectTeam(this.teams[0].team_id);
        this.disableTeams = false;
      }
    }
  }

  onSelectTeam(teamId) {
    this.selectedTeam = teamId;
    this.disablePlayer = true;
    let cached = localStorage.getItem("team"+teamId);
    if(isNullOrUndefined(cached)){
      this.findPlayersForTeam(teamId);
    }else{
      this.players = JSON.parse(cached);
      this.onSelectPlayer(this.players[0].player)
      this.disablePlayer = false;
    }
  }

  onSelectPlayer(playerName) {
    this.selectedPlayer = playerName;
    this.disablePosition = false;
    console.log(this.selectedPlayer);
  }

  findTeamForLeague(leagueId){
    this.teamService.findTeamsByLeagueId(leagueId).subscribe(res => {
      if(!isNullOrUndefined(res)){
        this.teams = Object.values(res['api'].teams);
        localStorage.setItem("league"+leagueId, JSON.stringify(this.teams));
        this.onSelectTeam(this.teams[0].team_id);
        this.disableTeams = false;
      }else{
        this.disableTeams = true;
      }
    });
  }

  findPlayersForTeam(teamId){
    this.teamService.findTeamRoster(teamId).subscribe(res => {
      if(!isNullOrUndefined(res)){
        this.players = res['api'].players;
        localStorage.setItem("team"+teamId, JSON.stringify(this.players));
        this.disablePlayer = false;
        this.onSelectPlayer(this.players[0].player)
      }else{
        this.disablePlayer = true;
      }
    });
  }

  addPlayer(){
    if(!this.disablePosition){
      this.fantasyTeam[this.selectedPosition].push(this.selectedPlayer);
    }else{
      alert("Select player first!")
    }
  }

  cancel(){
    this.selectedLeague = 0;
    this.onSelectLeague(this.selectedLeague)
  }

  deletePlayer(player){
    this.fantasyTeam[player.position] = this.fantasyTeam[player.position].filter(p => p!==player.player)
  }

  findFantasyTeamByManager(){
    this.profileService.findCurrentUser().subscribe(res => {
      console.log("RES IS" + res)
      console.log("RED ID IS" + res['_id']);
      if(!isNullOrUndefined(res)){
        this.profileService.findFantasyTeamByUser(res['_id']).subscribe(team => {
          if(team['length'] == 0){
            this.newTeam = true;
            this.fantasyTeam = {
              _id: (new Date().getTime() / 1000),
              name: "",
              goalkeepers: [],
              strikers: [],
              midfielders: [],
              defenders: [],
              subs: [],
              manager: res['_id']
            }
          }else{
            this.newTeam = false;
            console.log(team[0]);
            this.fantasyTeam = team[0]
          }
        });
      }
    })
  }

  saveFantasyTeam(){
    if(this.newTeam){
      this.profileService.createFantasyTeam(this.fantasyTeam).subscribe(res => console.log(res));
    }else{
      this.profileService.updateFantasyTeamByUser(this.fantasyTeam.manager, this.fantasyTeam).subscribe(res => {
        console.log(res);
      })
    }
  }

}
