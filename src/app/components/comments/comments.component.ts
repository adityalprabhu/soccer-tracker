import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: any;
  constructor() {
    this.comments = [
      {
        userId: 1,
        username: 'John',
        comment: 'This is a comment!'
      },
      {
        userId: 2,
        username: 'Jane',
        comment: 'This is another comment!'
      },
      {
        userId: 3,
        username: 'Alice',
        comment: 'This is yet another comment!'
      },
    ];
  }

  ngOnInit() {
  }

}
