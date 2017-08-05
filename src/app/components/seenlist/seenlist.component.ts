import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import {SearchService} from '../../services/search.service';
import { AppComponent } from '../../app.component';

@Component({
  moduleId: module.id,
  selector: 'seenlist',
  templateUrl: './seenlist.component.html',
  styleUrls: ['./seenlist.component.css']
})

export class SeenlistComponent {
  profile: any;
  idmovie: Array<number>;
  result: Array<object> = [];
  list: any;

  constructor(public auth: Auth, public _searchService: SearchService,  private app: AppComponent) {
    if (document.getElementById("menu").classList.contains("mobile-menu")) {
      app.mobileMenu('close')
    }

    if (this.auth.userProfile.user_metadata) {
      if (auth.userProfile.user_metadata.seenlist) {
        this.idmovie = auth.userProfile.user_metadata.seenlist;
        for (let value of this.idmovie) {
          this._searchService.searchMovie(value).subscribe(res => {
            this.result.push(res);
          })
        }
      }
    } else {
      auth.userProfile.user_metadata = new Object();
      auth.userProfile.user_metadata.seenlist = [];
      console.log(auth.userProfile.user_metadata.seenlist);
      this.result = null;
    }
  }

  newSeenList() {
    this.result = [];
    this.idmovie = this.auth.userProfile.user_metadata.seenlist;
    for (let value of this.idmovie) {
      this._searchService.searchMovie(value).subscribe(res => {
        this.result.push(res);
      })
    }
  }

// Ouvre ou ferme le menu des films
  navMovie(idmenu) {
    if (document.getElementById(idmenu).classList.contains("active")) {
      document.getElementById(idmenu).classList.remove("active");
    } else {
      document.getElementById(idmenu).classList.add("active");
    }
  }
}
