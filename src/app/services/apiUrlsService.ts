import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiUrlsService {

  // comments apis
  public static findAllComments = environment.domain + '/api/comment';
  public static createComment = environment.domain + '/api/comment';
  public static deleteComment = environment.domain + '/api/comment/';

}
