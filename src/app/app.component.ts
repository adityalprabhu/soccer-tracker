import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'soccer-tracker';
  loggedIn = true;
  leagues = {2: 'English', 87: 'Spanish', 4: 'French', 8: 'German', 94: 'Italian'};
  searchField = "";

  constructor(private router: Router){}
  search(){
    if(this.searchField != ""){
      this.router.navigate(['/search/' + this.searchField]);
    }
  }
}
