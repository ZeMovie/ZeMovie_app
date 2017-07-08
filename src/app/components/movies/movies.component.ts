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
  maxpages: number;

  constructor(public _movieService: MovieService, public _searchService: SearchService, public router: Router, private auth: Auth, private app: AppComponent) {
    if (document.getElementById("menu").classList.contains("mobile-menu")) {
      app.mobileMenu('close')
    }
    if (this.router.url === '/upcoming') {
      this._movieService.page = 1;
      this._movieService.upcoming().subscribe(res => {
        this.list = res.results;
        this.maxpages = res.total_pages;
      })
    } else {
      this._movieService.page = 1;
      this._movieService.getPopular().subscribe(res => {
        this.list = res.results;
        this.maxpages = res.total_pages;
      })
    }
  }

  more () {
      this._movieService.page = this._movieService.page +1;
      if (this.router.url === '/upcoming') {
        this._movieService.upcoming().subscribe(res => {
          this.list = res.results;
          this.maxpages = res.total_pages;
          document.getElementById('movies').scrollIntoView(true);
        })
      } else {
        this._movieService.getPopular().subscribe(res => {
          this.list = res.results;
          this.maxpages = res.total_pages;
          document.getElementById('movies').scrollIntoView(true);
        })
      }
  }

  less () {
    this._movieService.page = this._movieService.page -1;
    if (this.router.url === '/upcoming') {
      this._movieService.upcoming().subscribe(res => {
        this.list = res.results;
        this.maxpages = res.total_pages;
        document.getElementById('movies').scrollIntoView(true);
      })
    } else {
      this._movieService.getPopular().subscribe(res => {
        this.list = res.results;
        this.maxpages = res.total_pages;
        document.getElementById('movies').scrollIntoView(true);
      })
    }
  }

  firstpage () {
    this._movieService.page = 1;
    if (this.router.url === '/upcoming') {
      this._movieService.upcoming().subscribe(res => {
        this.list = res.results;
        this.maxpages = res.total_pages;
        document.getElementById('movies').scrollIntoView(true);
      })
    } else {
      this._movieService.getPopular().subscribe(res => {
        this.list = res.results;
        this.maxpages = res.total_pages;
        document.getElementById('movies').scrollIntoView(true);
      })
    }
  }

  end () {
    this._movieService.page = this.maxpages;
    if (this.router.url === '/upcoming') {
      this._movieService.upcoming().subscribe(res => {
        this.list = res.results;
        this.maxpages = res.total_pages;
        document.getElementById('movies').scrollIntoView(true);
      })
    } else {
      this._movieService.getPopular().subscribe(res => {
        this.list = res.results;
        this.maxpages = res.total_pages;
        document.getElementById('movies').scrollIntoView(true);
      })
    }
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
