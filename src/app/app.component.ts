import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from './services/movie.service';
import { Auth } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService,Auth]
})

export class AppComponent {
  constructor(private auth: Auth) {}

}
