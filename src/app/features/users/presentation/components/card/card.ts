import { Component, input, output } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  imports: [],
  selector: 'app-card',
  templateUrl: './card.html',
})
export class Card {
  user = input.required<User>()
  onEdit = output<User>()
  onDelete = output<string>()
}
