import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../services/teamService/team.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Utils} from '../../../assets/utils';
import {CommentServiceService} from '../../services/commentService/comment-service.service';
import {ProfileService} from '../../services/profileService/profile.service';
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']

})
export class LeagueTableComponent implements OnInit {

  leagueDetails;
  leagueId;
  leagueNames;
  leagueSeasonNext;
  leagueStandings;
  leagueLogos;
  teamLogos;
  comments: any;
  newComment: string;
  user: any;
  userId: Number;
  userName: String;
  loggedIn: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private teamService: TeamService,
              private commentsService: CommentServiceService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId = params.leagueId;
      this.findLeagueStandings(this.leagueId);
      this.findLeagueDetails(this.leagueId);
      this.getCurrentUser();
      this.findAllComments();
    });

    this.teamLogos = Utils.TEAMLOGOS;
    this.leagueLogos = Utils.LEAGUELOGOS;
    this.leagueNames = Utils.LEAGUENAMES;
  }

  findLeagueStandings(leagueId) {
    this.teamService.findLeagueStandings(leagueId).subscribe(res => {
      this.leagueStandings = res['api'].standings[0];
    });
  }

  findLeagueDetails(leagueId) {
    this.teamService.findLeagueDetails(leagueId).subscribe(res => {
      this.leagueDetails = res['api']['leagues'][leagueId];
      this.leagueSeasonNext = parseInt(this.leagueDetails.season, 10) + 1;
    });
  }

  findAllComments() {
    this.commentsService.findAllComments().subscribe(res => {
      var filteredComments = Object.values(res)
      filteredComments = filteredComments.filter(comment => comment.leagueId == this.leagueId);
      this.comments = filteredComments;
      console.log("COMMENTS = " + this.comments)
    });
  }

  postComment() {
    const comment = {
      userId: this.user._id,
      leagueId: this.leagueId,
      comment: this.newComment
    };

    this.commentsService.createComment(comment).subscribe(res => {
      this.findAllComments();
      this.newComment = '';
    });
  }

  getCurrentUser() {
    this.profileService.findCurrentUser().subscribe(res => {
      this.user = res;
      if(!isNullOrUndefined(this.user)){
        this.userId = this.user._id;
        this.userName = this.user.firstName + " " + this.user.lastName
        this.loggedIn = true;
        console.log(this.user);
      }
    });
  }

  deleteComment(commentId) {
    this.commentsService.deleteComment(commentId).subscribe(res => {
      this.findAllComments();
    });
  }


}
