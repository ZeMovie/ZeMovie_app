import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from './services/movie.service';
import { SearchService } from './services/search.service';
import { Auth } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService, SearchService, Auth]
})

export class AppComponent {
  constructor(private auth: Auth) {}

}
