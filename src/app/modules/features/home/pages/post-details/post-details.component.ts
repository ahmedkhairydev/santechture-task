import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'core/interfaces/post/post';
import { User } from 'core/interfaces/user/user';
import { Comment } from 'core/interfaces/comment/comment';
import { CommentsService } from 'features/home/services/comments/comments.service';
import { PostsService } from 'features/home/services/posts/posts.service';
import { UsersService } from 'features/home/services/users/users.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent {

  post!: Post;
  postId!: string;
  user!: User;
  comments!: Comment[];

  constructor(
    private dialogRef: MatDialogRef<PostDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; },
    private postsService: PostsService, private usersService: UsersService, private commentsService: CommentsService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.postId = this.data.activatedRoute.snapshot.firstChild?.paramMap.get('id') as string;
    this.getPost();
  }

  getPost() {
    this.postsService.getPost(this.postId).subscribe(post => {
      this.post = post;
      this.getUser(post.userId);
      this.getCommentsByPostId(`${post.id}`);
    });
  }

  getUser(userId: string | number) {
    this.usersService.getUser(`${userId}`).subscribe(user => this.user = user);
  }

  getCommentsByPostId(postId: string) {
    this.commentsService.getCommentByPostId(`${postId}`).subscribe(comments => this.comments = comments);
  }
}
