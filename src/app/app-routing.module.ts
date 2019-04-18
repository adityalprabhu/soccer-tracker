import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CommentsComponent} from './components/comments/comments.component';
import {LeagueTableComponent} from './components/league-table/league-table.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'comments', component: CommentsComponent},
  {path: 'leagues', component: LeagueTableComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
