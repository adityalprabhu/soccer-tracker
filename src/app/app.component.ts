import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soccer-tracker';
  loggedIn = true;
  leagues = {2: 'English', 87: 'Spanish', 4: 'French', 8: 'German', 94: 'Italian'};
}
