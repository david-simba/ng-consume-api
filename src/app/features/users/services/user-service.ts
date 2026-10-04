import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../../../environments/environment';

@Service()
export class UserService {
  private env = environment.API_URL
  private http = inject(HttpClient)

  getUsers() {
    return this.http.get<User[]>(this.env)
  } 

  createUser(user: User) {
    return this.http.post<User>(this.env, user)
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.env}/${user.id}`, user)
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.env}/${id}`)
  }
}
