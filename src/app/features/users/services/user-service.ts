import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { User } from '../models/user';

@Service()
export class UserService {
  private API_URL = 'https://6a77661063e9caf860c38402.mockapi.io/users'
  private http = inject(HttpClient)

  getUsers() {
    return this.http.get<User[]>(this.API_URL)
  } 

  createUser(user: User) {
    return this.http.post<User>(this.API_URL, user)
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.API_URL}/${user.id}`, user)
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`)
  }
}
