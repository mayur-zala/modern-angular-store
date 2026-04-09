import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('modern-angular-store');
}
