import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/Rx';

import { Auth } from '../services/auth.service';

@Injectable()
export class MovieService {
  apikey: string;
  year: number = new Date().getFullYear();
  newYear: number;

  constructor(private _jsonp: Jsonp, private auth: Auth) {
    this.apikey = 'fa4875ab7e9a1e73ffe0829c42e00ca6';
    console.log('MoviesService Initialized...')
  }

  getPopular() {
    return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&sort_by=popularity.desc&year=' + this.year + '&language=' + navigator.language + '&api_key=' + this.apikey)
      .map(res => res.json());
  }

  upcoming() {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK&language=' + navigator.language + '&api_key=' + this.apikey)
      .map(res => res.json());
  }
}
