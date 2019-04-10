import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  container: any;
  rightPanelActive: boolean;
  message: any;
  constructor() {
    this.rightPanelActive = false;
    this.message = 'sddsds';
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

  singIn() {

  }
}
