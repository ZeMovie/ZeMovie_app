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
    this.idmovie = auth.userProfile.user_metadata.watchlist;
    console.log(this.idmovie);
    for (let value of this.idmovie) {
      this._searchService.searchMovie(value).subscribe(res => {
        this.list = this.result.push(res);
        console.log(value);
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
