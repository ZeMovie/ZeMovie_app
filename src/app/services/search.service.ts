import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import { Router }        from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class SearchService {
  apikey: string;
  searchRes: Array<Object>;
  searchInput :string = null;
  page: number =1;
  maxpages: number;

  constructor(private _jsonp: Jsonp, private router: Router) {
    this.apikey = 'fa4875ab7e9a1e73ffe0829c42e00ca6';
  }

  search(search) {
    if (search != "") {
      this.searchMovies(search).subscribe(res => {
        this.searchRes = res.results;
        this.maxpages = res.total_pages;
        this.router.navigate(['search']);
      })
      this.searchInput = search;
    } else {
        this.searchRes = null;
    }
  }

  searchMovies(search: string) {
    return this._jsonp.get('https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK&query=' + search + '&page='+this.page +'&region='+navigator.language +'&language='+navigator.language +'&api_key=' + this.apikey)
      .map(res => res.json());
  }

  searchMovie(idmovie: number) {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + idmovie + '?api_key=' + this.apikey+ '&language='+navigator.language +'&callback=JSONP_CALLBACK')
      .map(res => res.json());
  }
}
