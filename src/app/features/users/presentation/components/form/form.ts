import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-form',
  templateUrl: './form.html',
})
export class Form {
  private fb = inject(FormBuilder)
  userToEdit = input<User | null>(null)
  onSubmit = output<User>()

  userForm = this.fb.nonNullable.group({
    id: Date.now().toString(),
    name: ['', Validators.required],
    email: ['', Validators.required],
    avatar: ['', Validators.required]
  })

  syncForm = effect(() => {
    const user = this.userToEdit()
    if(!user) return
    this.userForm.patchValue(user)
  })

  submit() {
    if(this.userForm.invalid) {
      this.userForm.markAsTouched()
      return
    }

    this.onSubmit.emit(this.userForm.getRawValue())
    this.userForm.reset()
  }
}
