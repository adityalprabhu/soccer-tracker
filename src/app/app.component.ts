import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProfileService} from "./services/profileService/profile.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'soccer-tracker';
  loggedIn: boolean;
  leagues = {2: 'English', 87: 'Spanish', 4: 'French', 8: 'German', 94: 'Italian'};
  searchField = "";

  constructor(private router: Router,
              private profileService: ProfileService){}


  ngOnInit() {
    this.loggedIn = false;
    this.getCurrentUser();

  }

  // noinspection JSAnnotator
  public getCurrentUser(): void {
    this.profileService.findCurrentUser().subscribe(res => {
      if(!isNullOrUndefined(res)){
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
    });
  }

  search(){
    if(this.searchField != ""){
      let searchCriteria = this.searchField;
      this.searchField = "";
      this.router.navigate(['/search/' + searchCriteria]);
    }
  }

  logout(){
    this.profileService.logout().subscribe(res => {
      console.log(res);
      this.getCurrentUser();
    })
  }

  onActivate(componentReference) {
    try {
      componentReference.login.subscribe((data) => {
        this.getCurrentUser();
      })
    }catch {
    }
  }
}
