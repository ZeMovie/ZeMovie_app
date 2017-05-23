import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SearchService {
    apikey: string;
    
    constructor(private _jsonp:Jsonp){
        this.apikey = 'fa4875ab7e9a1e73ffe0829c42e00ca6';
        console.log('MoviesService Initialized...')
    }
    
    searchMovie(searchStr: string){
        return this._jsonp.get('https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK&query='+searchStr+'&sort_by=popularity.desc&api_key='+this.apikey)
            .map(res => res.json());
    }
}