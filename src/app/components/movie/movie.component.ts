import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import {SearchService} from '../../services/search.service';


@Component({
  moduleId: module.id,
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: Object;
  credit: Object;
  res: Object;


  constructor(private router:ActivatedRoute, private _searchService:SearchService, private _movieService:MovieService){}

  ngOnInit(){
    this.router.params.subscribe((params) => {
      let id = params['id'];
      this._searchService.searchMovie(id).subscribe(res => {
        this.movie = res;
      })
      this._movieService.getCredit(id).subscribe(res => {
        this.credit = res.cast;
      })
    });
  }
}
