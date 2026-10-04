import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user';
import { Card } from '../../components/card/card';
import { Form } from '../../components/form/form';

@Component({
  imports: [Form, Card],
  selector: 'app-user-page',
  templateUrl: './user-page.html',
})
export class UserPage {
  private service = inject(UserService)
  users = signal<User[]>([])
  editUser = signal<User | null>(null)

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.service.getUsers().subscribe({
      next: (res) => {
        this.users.set(res)
      },
      error: (err) => {
        console.log(`Error al obtener usuarios ${err}`)
      }
    })
  }

  onAddUser(user: User) {
    this.service.createUser(user).subscribe({
      next: (createdUser) => {
        this.users.update(users => [
          ...users, createdUser
        ])
      },
      error: (err) => {
        console.log(`Error al obtener usuarios ${err}`)
      }
    })
  }

  onEdit(user: User) {
    this.editUser.set(user)
  }

  onUpdateUser(user: User) {
    this.service.updateUser(user).subscribe({
      next: (updatedUser) => {  
        this.users.update(users => (
          users.map(user => 
            user.id == updatedUser.id ? updatedUser : user
          )
        ))

        this.editUser.set(null)
      },
      error: (err) => {
        console.log(`Error al actualizar user ${err}`)
      }
    })
  }

  saveUser(user: User) {
    if(this.editUser()) {
      return this.onUpdateUser(user)
    }

    return this.onAddUser(user)
  }

  onDeleteUser(id: string) {
    this.service.deleteUser(id).subscribe({
      next: () => {
        this.users.update(user =>
          user.filter(user => user.id !== id)
        )
      },
      error: (err) => {
        console.log(`Error al eliminar user ${err}`)
      }
    })
  }
}
