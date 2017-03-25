import { Component }  from '@angular/core';
import { Auth } from './services/auth.service';

@Component({
  selector: 'home',
  template: `
    <h4 *ngIf="auth.authenticated()">You are logged in {{auth.userProfile.name}} </h4>
    <h4 *ngIf="!auth.authenticated()">You are not logged in, please click 'Log in' button to login</h4>
  `
})

export class HomeComponent {
  constructor(private auth: Auth) {}
};