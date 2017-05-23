import { Component } from '@angular/core';
import {MovieService} from '../../services/movie.service';

@Component({
  moduleId: module.id,
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
    popularList:Array<Object>;

    constructor(private _movieService: MovieService){
        this._movieService.getPopular().subscribe(res => {
            this.popularList = res.results;
        })
    }
}