import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fantasy-team',
  templateUrl: './fantasy-team.component.html',
  styleUrls: ['./fantasy-team.component.css']
})
export class FantasyTeamComponent implements OnInit {
  sample: any;
  leagues = {'': 0, 'English': 2, 'Spanish': 87, 'French': 4, 'German': 8, 'Italian': 94};
  teams: any;
  players: any;
  positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Striker'];
  fantasyTeam: any;
  constructor() {
    this.sample = ["1","2","3"]
  }

  ngOnInit() {

  }

}
