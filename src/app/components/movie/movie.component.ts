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
  runtime: string;


  constructor(private router: ActivatedRoute, private _searchService: SearchService, private _movieService: MovieService) {
    if (screen.height <= 768) {
      this.nbimage = 2;
    }
  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      let id = params['id'];
      this._movieService.getMovieDetails(id).subscribe(res => {
        /* Recuperation des acteurs du film */
        this.movie = res;
        this.credit = res.credits.cast;
        if (res.runtime) {
          this.runtime = Math.floor(res.runtime / 60) + "h" + (res.runtime - (Math.floor(res.runtime / 60) * 60)) + "min";
        }
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
