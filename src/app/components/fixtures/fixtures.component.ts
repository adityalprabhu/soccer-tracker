import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FixtureService} from '../../services/fixtureService/fixture.service';
import {Utils} from '../../../assets/utils';
import {element} from 'protractor';


@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {


  fixtures: any;
  leagueIDs: any;
  today: Date;
  englishLeague: true;
  spanishLeague: true;
  germanLeague: true;
  frenchLeague: true;
  italianLeague: true

  englishGames: any;
  spanishGames: any;
  germanGames: any;
  frenchGamesy;
  italianGames: any;


  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private fixtureService: FixtureService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.today = new Date();
      this.findLiveFixtures();
    });


  }




  findLiveFixtures() {
    this.fixtureService.findLiveFixtures().subscribe(res => {
      var todaysFixtures = [];
      var recentFixtures = Object.values(res['api'].fixtures);

      for (let fixture of recentFixtures) {

        let gameTime = new Date(fixture['event_date']);

        if (gameTime.getDate() === this.today.getDate()
          && (gameTime.getHours() - 2 > 0)
          && Utils.SUPPORTEDLEAGUES.includes(fixture['league_id'])) {
          todaysFixtures.push(fixture);
        }
      }

      this.fixtures = todaysFixtures;

      if (this.fixtures.length !== 0) {
        let hideLiveScores = document.getElementById('live-fixtures');
        hideLiveScores.style.display = 'inline';
      } else {
        let showNoLiveMatches = document.getElementById('no-live-fixtures');
        showNoLiveMatches.style.display = 'inline';
      }
    });
  }
}
