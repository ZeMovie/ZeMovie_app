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
  credit: any;
  res: Object;
  nbslide: number;
  nbimage: number = 5;
  countimages: number = 0;
  actor: Array<object> = [];
  actors: Array<object> = [];


  constructor(private router: ActivatedRoute, private _searchService: SearchService, private _movieService: MovieService) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      let id = params['id'];
      this._searchService.searchMovie(id).subscribe(res => {
        this.movie = res;
      })
      this._movieService.getCredit(id).subscribe(res => {
        /* Recuperation des acteurs du film */
        this.credit = res.cast;
        /* Calcul du nb de slide necessaire pour afficher nbimage par slide*/
        this.nbslide = Math.round(this.credit.length / this.nbimage);
        /* creation d'un tableau d'object actors en organisant les acteurs par parquet de nbimage*/
        for (var i = 0; i < this.nbslide; i++) {
          for (var j = 0; j < this.nbimage; j++) {
            if (this.credit[this.countimages]) {
                this.actor[j] = this.credit[this.countimages];
              this.countimages++;
            }
          }
          this.actors.push(this.actor);
          this.actor = [];
        }
      })
    });
  }
}
