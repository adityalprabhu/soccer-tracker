import { Component, OnInit } from '@angular/core';
import {CommentServiceService} from '../../services/commentService/comment-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: any;
  newComment: string;

  constructor(private commentsService: CommentServiceService) {
    this.comments = [
      {
        userId: 1,
        username: 'John',
        comment: 'This is a comment!'
      }
    ];
  }

  ngOnInit() {
    this.findAllComments();
  }

  findAllComments() {
    this.commentsService.findAllComments().subscribe(res => {
      this.comments = res;
    });
  }

  postComment() {
    const comment = {
      _id: 'NewUser' + (Date.now()),
      username: 'NewUser',
      comment: this.newComment
    };

    this.commentsService.createComment(comment).subscribe(res => {
      this.findAllComments();
      this.newComment = '';
    });
  }

  deleteComment(commentId) {
    this.commentsService.deleteComment(commentId).subscribe(res => {
      this.findAllComments();
    });
  }

}
