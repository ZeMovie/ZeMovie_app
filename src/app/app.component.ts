import { Component, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from './services/movie.service';
import { Auth } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService, Auth]
})

export class AppComponent {
  search: string;
  searchRes: Array<object>;
  popularList: Array<Object>;

  constructor(private auth: Auth, private _movieService: MovieService) { }

  searchMovies(search) {
    console.log(search);
    if (search != "") {
      this._movieService.searchMovies(search).subscribe(res => {
        this.searchRes = res.results;
      })
    }
  }
}
