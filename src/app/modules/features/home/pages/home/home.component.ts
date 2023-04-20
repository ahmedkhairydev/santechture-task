import { Component } from '@angular/core';
import { Post } from 'core/interfaces/post/post';
import { PostsService } from 'features/home/services/posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  posts: Post[] = [];

  start = '0';
  limit = '8';

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPosts();
  }

  getPosts() {
    const params = {
      _start: `${this.start}`,
      _limit: `${this.limit}`
    };

    this.postsService.getPosts(params).subscribe(posts => this.posts = posts);
  }
}
