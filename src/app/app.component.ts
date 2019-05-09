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
  isManager: boolean;
  leagues = {2: 'English', 87: 'Spanish', 4: 'French', 8: 'German', 94: 'Italian', 294: 'American'};
  searchField = "";

  constructor(private router: Router,
              private profileService: ProfileService){}


  ngOnInit() {
    this.loggedIn = false;
    this.isManager = false;
    this.getCurrentUser();

  }

  // noinspection JSAnnotator
  public getCurrentUser(): void {
    this.profileService.findCurrentUser().subscribe(res => {
      if(!isNullOrUndefined(res)){

        this.loggedIn = true;
        var user = Object.values(res);
        // JANKY fix this if you change the schema for users....
        if(user[6]){
          this.isManager = true;
        }
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

  logout() {
    this.isManager = false;
    this.loggedIn = false;
    this.profileService.logout().subscribe(res => {
      this.getCurrentUser();
    })
    this.router.navigateByUrl('/login', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/"]));
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
