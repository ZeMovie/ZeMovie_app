import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import { Router }        from '@angular/router';
import 'rxjs/Rx';

import { Auth } from '../services/auth.service';

@Injectable()
export class MovieService {
  apikey: string;
  year: number = new Date().getFullYear();
  newYear: number;
  page: number =1;
  region: string = navigator.language.split('-')[0];


  constructor(private _jsonp: Jsonp, private auth: Auth, private router: Router) {
    this.apikey = 'fa4875ab7e9a1e73ffe0829c42e00ca6';
    console.log('MoviesService Initialized...')
  }

  getPopular() {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/popular?callback=JSONP_CALLBACK&sort_by=popularity.desc&year='+this.year+'&page='+this.page+'&region='+navigator.language+'&language='+navigator.language+'&api_key='+this.apikey)
      .map(res => res.json());
  }

  upcoming() {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK&language='+navigator.language+'&page='+this.page+'&region='+this.region+'&api_key='+this.apikey)
      .map(res => res.json());
  }

  getCredit(idmovie: number) {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + idmovie + '/credits?api_key=' + this.apikey +'&callback=JSONP_CALLBACK')
      .map(res => res.json());
  }
}
