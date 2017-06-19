import { Component, Input } from '@angular/core';
import { Router }        from '@angular/router';

import {MovieService} from '../../services/movie.service';
import {SearchService} from '../../services/search.service';
import { Auth } from '../../services/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  moduleId: module.id,
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
  list: Array<Object>;
  search: Array<Object>;
  showed: number = 12;

  constructor(public _movieService: MovieService, public _searchService: SearchService, private router: Router, private auth: Auth) {
    if (this.router.url === '/upcoming') {
      this._movieService.upcoming().subscribe(res => {
        this.list = res.results;
      })
    } else {
      this._movieService.getPopular().subscribe(res => {
        this.list = res.results;
      })
    }
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

  checkMovie(idmovie) {
    if (this.auth.userProfile.user_metadata) {
      if (this.auth.userProfile.user_metadata.watchlist) {
        var mymovies = this.auth.userProfile.user_metadata.watchlist;
        for (let movie of mymovies) {
          if (movie == idmovie) {
            return true;
          }
        }
        return false;
      } else {
        return false;
      }
    }
  }
}
