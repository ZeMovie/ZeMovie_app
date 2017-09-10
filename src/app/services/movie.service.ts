import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import { Router }        from '@angular/router';
import 'rxjs/Rx';

import { Auth } from '../services/auth.service';

@Injectable()
export class MovieService {
  apikey: string;
  year: number = new Date().getFullYear();
  page: number =1;
  region: string = navigator.language.split('-')[0];


  constructor(private _jsonp: Jsonp, private auth: Auth, private router: Router) {
    this.apikey = 'fa4875ab7e9a1e73ffe0829c42e00ca6';
    console.log('MoviesService Initialized...')
  }

  getPopular() {
    return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&sort_by=popularity.desc&primary_release_year='+this.year+'&page='+this.page+'&language='+navigator.language+'&api_key='+this.apikey)
      .map(res => res.json());
  }

  upcoming() {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK&language='+navigator.language+'&page='+this.page+'&region='+this.region+'&api_key='+this.apikey)
      .map(res => res.json());
  }

  getMovieDetails(idmovie: number) {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + idmovie + '?api_key=' + this.apikey+ '&language='+navigator.language +'&callback=JSONP_CALLBACK&append_to_response=credits')
      .map(res => res.json());
  }

  getVideos(idmovie: number) {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + idmovie + '/videos?api_key=' + this.apikey+ '&language='+navigator.language +'&callback=JSONP_CALLBACK&append_to_response=credits')
      .map(res => res.json());
  }

  // Permet l'affichage du nombre de jour avant la sortie
  countdown(release_date){
    var todayDate: any = new Date();
    var releaseDate: any = new Date(release_date);var releaseDate : any
    var difference = Math.ceil((releaseDate - todayDate) / 86400000);

    return difference;
  }
}
