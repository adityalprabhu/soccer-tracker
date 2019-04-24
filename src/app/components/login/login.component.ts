import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProfileService} from '../../services/profileService/profile.service';
import { Output, EventEmitter } from '@angular/core';
import {AppComponent} from "../../app.component";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() login: EventEmitter<any> = new EventEmitter();

  container: any;
  rightPanelActive: boolean;
  message: any;

  email: string;
  password: string;
  firstName: string;
  lastName: string;
  manager: boolean;
  showLoginError: boolean;
  showSignUpError: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private profileService: ProfileService) {
    this.rightPanelActive = false;
    // this.message = 'sddsds';
    // this.email = "example@example.com";
    // this.firstName ="John";
    // this.lastName = "Doe";
    // this.password = "password";
    this.manager = false;
    this.showLoginError = false;
    this.showSignUpError = false;

  }

  ngOnInit() {
  }

  goToSignUp() {
    this.showSignUpError = false;
    this.rightPanelActive = !this.rightPanelActive;
  }

  goToSignIn() {
    this.showLoginError = false;
    this.rightPanelActive = !this.rightPanelActive;
  }

  signUp() {

    if(this.email == null || this.password == null || this.firstName == null || this.lastName == null){
      this.showSignUpError = true;
      return;
    }

    let user = {_id: (new Date().getTime() / 10000), email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName, manager: this.manager}
    this.profileService.register(user).subscribe(res => {
      console.log(res);
      if(!isNullOrUndefined(res)){
      this.rightPanelActive = !this.rightPanelActive;
      this.showSignUpError = false;
      }else{
        this.showSignUpError = true;
      }
    })
  }

  signIn() {
    let user = {email: this.email, password: this.password};
    this.profileService.login(user).subscribe(res => {
      console.log(res);
      if(!isNullOrUndefined(res)){
        this.showLoginError = false;
        localStorage.setItem('user', JSON.stringify(res));
        this.login.emit(res);
        this.router.navigate(['/']);
      }else{
        this.showLoginError = true;
      }
    })
  }
}
