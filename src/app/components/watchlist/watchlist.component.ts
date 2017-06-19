import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import {SearchService} from '../../services/search.service';

@Component({
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
    }else{
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
}
