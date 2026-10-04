import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserPage } from './features/users/presentation/pages/user-page/user-page';

@Component({
  imports: [RouterOutlet, UserPage],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ng-angular-api');
}
