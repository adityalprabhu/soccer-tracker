import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit {

  constructor() {

    this.data = [
            {
              "rank": "1",
              "team_id": "40",
              "teamName": "Liverpool",
              "matchsPlayed": "34",
              "win": "26",
              "draw": "7",
              "lose": "1",
              "goalsFor": "77",
              "goalsAgainst": "20",
              "goalsDiff": "57",
              "points": "85",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "2",
              "team_id": "50",
              "teamName": "Manchester City",
              "matchsPlayed": "33",
              "win": "27",
              "draw": "2",
              "lose": "4",
              "goalsFor": "86",
              "goalsAgainst": "22",
              "goalsDiff": "64",
              "points": "83",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "3",
              "team_id": "47",
              "teamName": "Tottenham",
              "matchsPlayed": "33",
              "win": "22",
              "draw": "1",
              "lose": "10",
              "goalsFor": "64",
              "goalsAgainst": "34",
              "goalsDiff": "30",
              "points": "67",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "4",
              "team_id": "42",
              "teamName": "Arsenal",
              "matchsPlayed": "33",
              "win": "20",
              "draw": "6",
              "lose": "7",
              "goalsFor": "66",
              "goalsAgainst": "40",
              "goalsDiff": "26",
              "points": "66",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "5",
              "team_id": "49",
              "teamName": "Chelsea",
              "matchsPlayed": "34",
              "win": "20",
              "draw": "6",
              "lose": "8",
              "goalsFor": "57",
              "goalsAgainst": "36",
              "goalsDiff": "21",
              "points": "66",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "6",
              "team_id": "33",
              "teamName": "Manchester United",
              "matchsPlayed": "33",
              "win": "19",
              "draw": "7",
              "lose": "7",
              "goalsFor": "63",
              "goalsAgainst": "44",
              "goalsDiff": "19",
              "points": "64",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "7",
              "team_id": "46",
              "teamName": "Leicester",
              "matchsPlayed": "34",
              "win": "14",
              "draw": "5",
              "lose": "15",
              "goalsFor": "46",
              "goalsAgainst": "45",
              "goalsDiff": "1",
              "points": "47",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "8",
              "team_id": "39",
              "teamName": "Wolves",
              "matchsPlayed": "33",
              "win": "13",
              "draw": "8",
              "lose": "12",
              "goalsFor": "41",
              "goalsAgainst": "42",
              "goalsDiff": "-1",
              "points": "47",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "9",
              "team_id": "45",
              "teamName": "Everton",
              "matchsPlayed": "34",
              "win": "13",
              "draw": "7",
              "lose": "14",
              "goalsFor": "46",
              "goalsAgainst": "44",
              "goalsDiff": "2",
              "points": "46",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "10",
              "team_id": "38",
              "teamName": "Watford",
              "matchsPlayed": "33",
              "win": "13",
              "draw": "7",
              "lose": "13",
              "goalsFor": "47",
              "goalsAgainst": "48",
              "goalsDiff": "-1",
              "points": "46",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "11",
              "team_id": "48",
              "teamName": "West Ham",
              "matchsPlayed": "34",
              "win": "12",
              "draw": "6",
              "lose": "16",
              "goalsFor": "42",
              "goalsAgainst": "52",
              "goalsDiff": "-10",
              "points": "42",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "12",
              "team_id": "35",
              "teamName": "Bournemouth",
              "matchsPlayed": "34",
              "win": "12",
              "draw": "5",
              "lose": "17",
              "goalsFor": "49",
              "goalsAgainst": "61",
              "goalsDiff": "-12",
              "points": "41",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "13",
              "team_id": "52",
              "teamName": "Crystal Palace",
              "matchsPlayed": "34",
              "win": "11",
              "draw": "6",
              "lose": "17",
              "goalsFor": "40",
              "goalsAgainst": "46",
              "goalsDiff": "-6",
              "points": "39",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "14",
              "team_id": "44",
              "teamName": "Burnley",
              "matchsPlayed": "34",
              "win": "11",
              "draw": "6",
              "lose": "17",
              "goalsFor": "42",
              "goalsAgainst": "60",
              "goalsDiff": "-18",
              "points": "39",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "15",
              "team_id": "34",
              "teamName": "Newcastle",
              "matchsPlayed": "34",
              "win": "10",
              "draw": "8",
              "lose": "16",
              "goalsFor": "32",
              "goalsAgainst": "43",
              "goalsDiff": "-11",
              "points": "38",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "16",
              "team_id": "41",
              "teamName": "Southampton",
              "matchsPlayed": "33",
              "win": "9",
              "draw": "9",
              "lose": "15",
              "goalsFor": "39",
              "goalsAgainst": "54",
              "goalsDiff": "-15",
              "points": "36",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "17",
              "team_id": "51",
              "teamName": "Brighton",
              "matchsPlayed": "33",
              "win": "9",
              "draw": "6",
              "lose": "18",
              "goalsFor": "32",
              "goalsAgainst": "53",
              "goalsDiff": "-21",
              "points": "33",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "18",
              "team_id": "43",
              "teamName": "Cardiff",
              "matchsPlayed": "34",
              "win": "9",
              "draw": "4",
              "lose": "21",
              "goalsFor": "30",
              "goalsAgainst": "63",
              "goalsDiff": "-33",
              "points": "31",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "19",
              "team_id": "36",
              "teamName": "Fulham",
              "matchsPlayed": "34",
              "win": "5",
              "draw": "5",
              "lose": "24",
              "goalsFor": "32",
              "goalsAgainst": "76",
              "goalsDiff": "-44",
              "points": "20",
              "lastUpdate": "2019-04-16"
            },
            {
              "rank": "20",
              "team_id": "37",
              "teamName": "Huddersfield",
              "matchsPlayed": "34",
              "win": "3",
              "draw": "5",
              "lose": "26",
              "goalsFor": "19",
              "goalsAgainst": "67",
              "goalsDiff": "-48",
              "points": "14",
              "lastUpdate": "2019-04-16"
            }
          ];
  }

  data;

  findLeagueTableById = () => {
    fetch('https://api-football-v1.p.rapidapi.com/leagues', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '2c4a4fc99amshe50fdd337dd7144p16d624jsn64cd58af65a9'
      },
      method: 'GET',
      mode: 'no-cors'
    }).then(response => console.log(response.json()));
  }



  ngOnInit() {
    this.findLeagueTableById();
  }


}
