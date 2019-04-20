import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProfileService} from '../../services/profileService/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  container: any;
  rightPanelActive: boolean;
  message: any;

  email: string;
  password: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private profileService: ProfileService) {
    this.rightPanelActive = false;
    this.message = 'sddsds';
    this.email = "example@example.com"
    this.password = "password"

  }

  ngOnInit() {
  }

  goToSignUp() {
    this.rightPanelActive = !this.rightPanelActive;

  }

  goToSignIn() {
    this.rightPanelActive = !this.rightPanelActive;
  }

  signUp() {
    console.log('sdsdsd');
  }

  signIn() {

    console.log(this.email)
    console.log(this.password)
    let user = {email: this.email, password: this.password}
    this.profileService.login(user)
  }
}
