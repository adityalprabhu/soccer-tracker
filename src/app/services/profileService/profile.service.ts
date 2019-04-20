import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {



  constructor(private httpClient: HttpClient) {


  }

  public findCurrentUser() {
     return this.httpClient.get(environment.local5000 + '/api/currentUser');
  }

  public login(user) {
    console.log(user)
    this.httpClient.post(environment.local5000 + '/api/login', user).subscribe(res => {
      console.log(res)
      return res;
    })
  }

}
