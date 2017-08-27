import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { AppComponent } from '../../app.component';
import { SearchService } from '../../services/search.service';

@Component({
  moduleId: module.id,
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent {

  nbFollowers: number;
  nbFriends: number;
  totalRuntime: number = 0;
  idMovie: Array<number>;
  watchedTime: string;

  constructor(public auth: Auth, public app: AppComponent, public _searchService: SearchService, ) {
    if (document.getElementById("menu").classList.contains("mobile-menu")) {
      app.mobileMenu('close')
    }
    this.nbFollowers = auth.userProfile.user_metadata.followers.length;
    this.nbFriends = auth.userProfile.user_metadata.friends.length;
    this.idMovie = auth.userProfile.user_metadata.seenlist;

    //
    for (let value of this.idMovie) {
      this._searchService.searchMovie(value).subscribe(res => {
        this.totalRuntime = this.totalRuntime + res.runtime;
        console.log(this.totalRuntime);

        if (this.totalRuntime < 60 ){
          this.watchedTime = this.totalRuntime+" min";
        }
        else if (this.totalRuntime < 1440){
          this.watchedTime = Math.floor(this.totalRuntime / 60) + "h" + (this.totalRuntime - (Math.floor(this.totalRuntime / 60) * 60)) + "min";
        }
        else {
          this.watchedTime =  Math.floor(this.totalRuntime / 1440 ) + "day(s) " + Math.floor((this.totalRuntime - ( Math.floor(this.totalRuntime / 1440 ) * 1440 )) / 60) + "h " + (this.totalRuntime - (Math.floor(this.totalRuntime / 60) * 60)) + "min";
        }

      })
    }
  }
}
