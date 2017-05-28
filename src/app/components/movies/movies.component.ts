import { Component, Input } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import { AppComponent } from '../../app.component';

@Component({
  moduleId: module.id,
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
  popularList: Array<Object>;
  @Input() searchRes;

  constructor(private _movieService: MovieService) {
    this._movieService.getPopular().subscribe(res => {
      this.popularList = res.results;
    })
  }
}
