import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CommentsComponent } from './components/comments/comments.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { TeamComponent } from './components/team/team.component';
import { FixturesComponent } from './components/fixtures/fixtures.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { FantasyTeamComponent } from './components/fantasy-team/fantasy-team.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CommentsComponent,
    LeagueTableComponent,
    TeamComponent,
    FixturesComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    FantasyTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
