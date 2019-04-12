import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../apiUrlsService';

@Injectable({
  providedIn: 'root'
})

export class CommentServiceService {

  findAllCommentsApiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.findAllCommentsApiUrl = ApiUrlsService.findAllComments;
  }

  public findAllComments() {
    return this.httpClient.get(this.findAllCommentsApiUrl);
  }

}
