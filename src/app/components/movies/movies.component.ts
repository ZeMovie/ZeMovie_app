import { Component, Input } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {SearchService} from '../../services/search.service';
import { AppComponent } from '../../app.component';

@Component({
  moduleId: module.id,
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
  popularList: Array<Object>;
  search: Array<Object>;

  constructor(private _movieService: MovieService, private _searchService: SearchService) {
    this._movieService.getPopular().subscribe(res => {
      this.popularList = res.results;
    })
  }
}
