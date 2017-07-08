import { Injectable}      from '@angular/core';
import { tokenNotExpired, AuthHttp, AuthConfig} from 'angular2-jwt';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router }        from '@angular/router';
import {Http, RequestOptions} from '@angular/http';
import { Auth0Lock } from 'auth0-lock';

// Avoid name not found warnings
const Auth0Lock = require('auth0-lock').default

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('CfuBl46dOLqlFVhDVTJQMDTXr8ToBM6R', 'zemovie.eu.auth0.com', {
    theme: {
      primaryColor: "#0093ab"
    },
    languageDictionary: {
      title: "Ze Movie"
    },
  });

  //Store profile object in auth class
  userProfile;

  constructor(private toastr: ToastsManager, private router: Router, private authHttp: AuthHttp) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        this.toastr.success("Welcome " + profile.nickname);
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate([''])
  }

  public addMovie(movieid: number) {
    if (typeof this.userProfile.user_metadata.watchlist !== 'undefined') {
      this.userProfile.user_metadata.watchlist.push(movieid);
      localStorage.setItem('profile', JSON.stringify(this.userProfile));
    }
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var data: any = JSON.stringify({ "user_metadata": { "watchlist": this.userProfile.user_metadata.watchlist } });
    var userid = this.userProfile.user_id;
    this.authHttp.patch('https://zemovie.eu.auth0.com/api/v2/users/' + userid, data, { headers: headers })
      .map(response => response.json())
      .subscribe(
      response => {
        this.userProfile = response;
        localStorage.setItem('profile', JSON.stringify(response));
      },
      err => console.log(err)
      );
  }

  public suppMovie(movieid: number) {
    for (let movie in this.userProfile.user_metadata.watchlist) {
      if (this.userProfile.user_metadata.watchlist[movie] == movieid) {
        this.userProfile.user_metadata.watchlist.splice(movie, 1);
        localStorage.setItem('profile', JSON.stringify(this.userProfile));
      }
    }
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var data: any = JSON.stringify({ "user_metadata": { "watchlist": this.userProfile.user_metadata.watchlist } });
    var userid = this.userProfile.user_id;
    this.authHttp.patch('https://zemovie.eu.auth0.com/api/v2/users/' + userid, data, { headers: headers })
      .map(response => response.json())
      .subscribe(
      response => {
        this.userProfile = response;
        localStorage.setItem('profile', JSON.stringify(response));
      },
      err => console.log(err)
      );
  }

}
