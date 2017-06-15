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
  showed: number = 12;

  constructor(public _movieService: MovieService, public _searchService: SearchService) {
    this._movieService.getPopular().subscribe(res => {
      this.popularList = res.results;
    })
    this._searchService.searchRes = null;
  }

  more() {
    this.showed = this.showed + 4;
  }

  navMovie(idmenu) {
    if (document.getElementById(idmenu).classList.contains("active")) {
      document.getElementById(idmenu).classList.remove("active");
    } else {
      document.getElementById(idmenu).classList.add("active");
    }
  }
}
