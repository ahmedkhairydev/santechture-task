import { Injectable } from '@angular/core';
import { User } from 'core/interfaces/user/user';
import { HttpService } from 'core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends HttpService {
  protected get baseUrl(): string {
    return 'users';
  }

  get users() {
    return this.get<User[]>({ APIName: '' });
  }

  getUser(id: string) {
    return this.get<User>({ APIName: `/${id}` });
  }
}
