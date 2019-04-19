import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FixtureService} from "../../services/fixtureService/fixture.service";
import {Utils} from "../../../assets/utils";


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
  italianLeague: true;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private fixtureService: FixtureService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.findLiveFixtures();
      this.today = new Date();
    });


  }


  findLiveFixtures() {
    this.fixtureService.findLiveFixtures().subscribe(res => {
      var todaysFixtures = [];
      var recentFixtures = Object.values(res['api'].fixtures);

      for (let fixture of recentFixtures) {

        let date = new Date(fixture['event_date']);

        if (date.getDate() === this.today.getDate()&& Utils.SUPPORTEDLEAGUES.includes(fixture['league_id'])) {
          todaysFixtures.push(fixture);
        }
      }

      this.fixtures = recentFixtures;

      if (this.fixtures.length != 0) {
        let element = document.getElementById('live-fixtures');
        element.style.visibility = 'visible';
      }
    });
  }
}
