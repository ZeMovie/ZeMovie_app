import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MovieService {
  apikey: string;

  constructor(private _jsonp: Jsonp) {
    this.apikey = 'fa4875ab7e9a1e73ffe0829c42e00ca6';
    console.log('MoviesService Initialized...')
  }

  getPopular() {
    return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&sort_by=popularity.desc&api_key=' + this.apikey)
      .map(res => res.json());
  }
}
