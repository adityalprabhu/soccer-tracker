import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders(),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})


export class ProfileService {


  constructor(private httpClient: HttpClient) {

  }

  public findUserById(uid){
    return this.httpClient.get(environment.local5000 + '/api/user/' + uid, httpOptions);
  }

  public findCurrentUser() {
    return this.httpClient.post(environment.local5000 + '/api/currentUser', httpOptions,httpOptions);
  }

  public login(user) {
    return this.httpClient.post(environment.local5000 + '/api/login', user, httpOptions);
  }

  public register(user) {
    return this.httpClient.post(environment.local5000 + '/api/register', user, httpOptions);
  }

  public updateUser(userId, user) {
    return this.httpClient.put(environment.local5000 + '/api/user/' + userId, user, httpOptions);
  }

  public logout() {
    return this.httpClient.post(environment.local5000 + '/api/logout', {responseType: 'text'}, httpOptions);
  }

  public findFantasyTeamByUser(mid){
    console.log(mid)

    return this.httpClient.post(environment.local5000 + '/api/team/manager/'+ mid, httpOptions);
  }


  public createFantasyTeam(team){
    return this.httpClient.post(environment.local5000 + '/api/team/', team,  httpOptions);
  }

  public updateFantasyTeamByUser(mid, team){
    return this.httpClient.put(environment.local5000 + '/api/team/'+ mid, team,  httpOptions);
  }

}
