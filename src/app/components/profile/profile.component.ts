import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {ProfileService} from '../../services/profileService/profile.service';
import {Utils} from '../../../assets/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  teams: any;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private profileService: ProfileService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCurrentUser();

    });

  }

  getCurrentUser() {
    this.profileService.findCurrentUser()
      .subscribe(res => {
        console.log(res)
        this.user = res;

        this.email = this.user.email;
        this.password = this.user.password;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.teams = this.user.teams;
      })
  }


}
