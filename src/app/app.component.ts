import { Component } from '@angular/core';
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
  constructor() {
  }
}
