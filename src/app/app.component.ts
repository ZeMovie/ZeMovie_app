import { Component } from '@angular/core';
import { Stormpath, Account } from 'angular-stormpath';
import { Observable } from 'rxjs';
import { MovieService } from './services/movie.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService]
})

export class AppComponent {
  private user$: Observable<Account | boolean>;
  private loggedIn$: Observable<boolean>;
  private login: boolean;
  private register: boolean;
 
  constructor(public stormpath: Stormpath) {
  }
 
  ngOnInit() {
    this.login = true;
    this.register = false;
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
  }
 
  showLogin() {
    this.login = !(this.register = false);
  }
 
  showRegister() {
    this.register = !(this.login = false);
  }
 
  logout() {
    this.stormpath.logout();
  }
}