import { Component, Input} from '@angular/core';
import { Router }        from '@angular/router';

import {MovieService} from '../../services/movie.service';
import {SearchService} from '../../services/search.service';
import { Auth } from '../../services/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  list: Array<Object>;
  search: Array<Object>;

  constructor(public _movieService: MovieService, public _searchService: SearchService, private router: Router, private auth: Auth) {
  }

  more () {
      this._searchService.page = this._searchService.page +1;
      this._searchService.searchMovies(this._searchService.searchInput).subscribe(res => {
        this._searchService.searchRes = res.results;
          this._searchService.maxpages = res.total_pages;
        })
  }

  less () {
    this._searchService.page = this._searchService.page -1;
    this._searchService.searchMovies(this._searchService.searchInput).subscribe(res => {
      this._searchService.searchRes = res.results;
        this._searchService.maxpages = res.total_pages;
      })
  }

  firstpage () {
    this._searchService.page = 1;
    this._searchService.searchMovies(this._searchService.searchInput).subscribe(res => {
      this._searchService.searchRes = res.results;
        this._searchService.maxpages = res.total_pages;
      })
  }

  end () {
    this._searchService.page = this._searchService.maxpages;
    this._searchService.searchMovies(this._searchService.searchInput).subscribe(res => {
      this._searchService.searchRes = res.results;
        this._searchService.maxpages = res.total_pages;
      })
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
