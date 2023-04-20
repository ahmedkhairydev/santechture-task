import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { Comment } from 'core/interfaces/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends HttpService {
  protected get baseUrl(): string {
    return 'comments';
  }

  get users() {
    return this.get<Comment[]>({ APIName: '' });
  }

  getComment(id: string) {
    return this.get<Comment>({ APIName: `/${id}` });
  }

  getCommentByPostId(postId: string) {
    return this.get<Comment[]>({ APIName: ``, params: { postId } });
  }
}
