import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import {SearchService} from '../../services/search.service';

@Component({
  moduleId: module.id,
  selector: 'watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})

export class WatchlistComponent {
  profile: any;
  idmovie: Array<number>;
  result: Array<object> = [];
  list: any;

  constructor(public auth: Auth, public _searchService: SearchService) {
    if (this.auth.userProfile.user_metadata) {
      if (auth.userProfile.user_metadata.watchlist) {
        this.idmovie = auth.userProfile.user_metadata.watchlist;
        for (let value of this.idmovie) {
          this._searchService.searchMovie(value).subscribe(res => {
            this.result.push(res);
          })
        }
      }
    } else {
      auth.userProfile.user_metadata = new Object();
      auth.userProfile.user_metadata.watchlist = [];
      console.log(auth.userProfile.user_metadata.watchlist);
      this.result = null;
    }
  }

  newWatchList() {
    this.result = [];
    this.idmovie = this.auth.userProfile.user_metadata.watchlist;
    for (let value of this.idmovie) {
      this._searchService.searchMovie(value).subscribe(res => {
        this.result.push(res);
      })
    }
  }

  navMovie(idmenu) {
    if (document.getElementById(idmenu).classList.contains("active")) {
      document.getElementById(idmenu).classList.remove("active");
    } else {
      document.getElementById(idmenu).classList.add("active");
    }
  }

  // Verification de la date pour la sortie
  checkDate(release_date, range, option) {
    var todayDate: any = new Date();
    var releaseDate: any = new Date(release_date);
    var difference = Math.round((releaseDate - todayDate) / 86400000); // (1000 * 3600 * 24) = (milliseconde par seconde * seconde par heure * heure par journée)

    console.log(release_date);

    if (option == "-") {
      if (difference <= range) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      if (difference >= range) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
