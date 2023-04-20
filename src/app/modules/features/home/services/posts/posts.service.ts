import { Injectable } from '@angular/core';
import { Post } from 'core/interfaces/post/post';
import { HttpService } from 'core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends HttpService {
  protected get baseUrl(): string {
    return 'posts';
  }

  getPosts(params: { [key: string]: string }) {
    return this.get<Post[]>({ APIName: '', params });
  }

  update(body: Partial<Post>) {
    return this.put({ APIName: `/${body.id}`, body, showAlert: true });
  }

  getPost(id: string) {
    return this.get<Post>({ APIName: `/${id}` });
  }
}
