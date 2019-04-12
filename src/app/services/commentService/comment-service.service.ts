import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../apiUrlsService';

@Injectable({
  providedIn: 'root'
})

export class CommentServiceService {

  findAllCommentsApiUrl: string;
  createCommentApiUrl: string;
  deleteCommentApiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.findAllCommentsApiUrl = ApiUrlsService.findAllComments;
    this.createCommentApiUrl = ApiUrlsService.createComment;
    this.deleteCommentApiUrl = ApiUrlsService.deleteComment;
  }

  public findAllComments() {
    return this.httpClient.get(this.findAllCommentsApiUrl);
  }

  public createComment(comment) {
    return this.httpClient.post(this.createCommentApiUrl, comment);
  }

  public deleteComment(commentId) {
    return this.httpClient.delete(this.deleteCommentApiUrl + commentId);
  }

}
