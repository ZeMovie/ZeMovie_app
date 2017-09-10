import { Component } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { SearchService } from '../../services/search.service';
import { AppComponent } from '../../app.component';



@Component({
  moduleId: module.id,
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  movie: Object;
  credit: any;
  res: Object;
  nbslide: number;
  nbimage: number = 5;
  countimages: number = 0;
  actor: Array<object> = [];
  actors: Array<object> = [];
  runtime: string;
  videoId = null;
  player: YT.Player;
  ytEvent : any;
  playerH : any;
  playerW : any;


  constructor(private router: ActivatedRoute, private _searchService: SearchService, private _movieService: MovieService, private app: AppComponent) {

    this.playerW = this.app.innerWidth * 0.5;
    this.playerH = this.playerW * 0.6;

    if (this.app.innerWidth <= 768) {
      this.nbimage = 2;
      this.playerW = this.app.innerWidth;
      this.playerH = this.playerW * 0.6;
    }

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
      });
      this._movieService.getVideos(id).subscribe(res => {
        if (res.results[0] != null) {
          this.videoId = res.results[0].key;
        } else {
          this.videoId = null;
        }
      });
    });
  }

  trailer() {
    if (document.getElementById("popup").classList.contains("show")) {
      document.getElementById("popup").classList.remove("show");
      this.player.pauseVideo();
    } else {
      if (this.app.innerWidth <= 768) {
        document.getElementById("popup").classList.add("show");
        this.player.playVideo();
      }else{
      document.getElementById("popup").classList.add("show");
    }
    }
  }

  savePlayer(player) {
    this.player = player;
  }
  onStateChange(event) {
    this.ytEvent = event.data;
  }

}
