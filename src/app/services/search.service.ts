import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import { Router }        from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class SearchService {
  apikey: string;
  searchRes: Array<Object>;

  constructor(private _jsonp: Jsonp, private router: Router) {
    this.apikey = 'fa4875ab7e9a1e73ffe0829c42e00ca6';
  }

  search(search) {
    if (search != "") {
      this.router.navigate([''])
      this.searchMovies(search).subscribe(res => {
        this.searchRes = res.results;
      })
    } else {
        this.searchRes = null;
    }
  }

  searchMovies(search: string) {
    return this._jsonp.get('https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK&query=' + search + '&sort_by=popularity.desc&api_key=' + this.apikey)
      .map(res => res.json());
  }
}
