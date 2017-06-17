import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router }        from '@angular/router';
import {Http} from '@angular/http';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('CfuBl46dOLqlFVhDVTJQMDTXr8ToBM6R', 'zemovie.eu.auth0.com', {
    theme: {
      primaryColor: "green"
    },
    languageDictionary: {
      title: "Ze Movie"
    },
  });

  //Store profile object in auth class
  userProfile;

  constructor(private toastr: ToastsManager, private router: Router) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        this.toastr.success("Welcome " + this.userProfile.nickname);
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

  private updateUser(movieid:number) {
    if (typeof this.userProfile.user_metadata.watchlist !== 'undefined') {
      this.userProfile.user_metadata.watchlist.push(movieid);
      localStorage.setItem('profile', JSON.stringify(this.userProfile));
    }
    var data = { "user_metadata": { "watchlist": this.userProfile.user_metadata.watchlist } };
    var userid = this.userProfile.user_id;
    var request = require("request");
   
    var options = {
      method: 'PATCH',
      url: 'https://zemovie.eu.auth0.com/api/v2/users/' + userid,
      headers:
      {
        'content-type': 'application/json',
        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9VVXhRMFpGUmtaRU5EbEJNRVpGUkVReFJUSXpNemcxTXpFM05rWkZOMEZDTlRkQk9EVXdNZyJ9.eyJpc3MiOiJodHRwczovL3plbW92aWUuZXUuYXV0aDAuY29tLyIsInN1YiI6InlmRVcwQVE2VWc5cFY0cXZ5Vzc1MlNkZmtuNGNES0ZLQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3plbW92aWUuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE0OTc3NDU3MTUsImlhdCI6MTQ5NzY1OTMxNSwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IifQ.uRaMIzOpxiggMWeeIWTICY2RiMcO1qwxvO9S-QRBD447KMRkkmExd5KeEnPMkymGJqHxGsMAuCMOx56LBAXoVPdXEGyFsGA2lYn4xKgHqa2J0HCidAzxYlaU0E0oayPlcRoZfvDpCF3_iwB9ahS6-Iydy2-6dOhkKiXEhzSA-yQWctdKVdXb8XOmTBqPdemjQRZfxV78mer70PvEfjqLabNPOvp3GYPupnto-UdQa0Eu0XPeaf-5g-CUYhDl5YJEoy1WarRvNnzVf1UAnMLytyisJ1hTJ4c4H30_9fOSEZSU0MTpqrh4tL_pP0JK1cDnI-NiM-ZnWEmoc1D88NAstw'
      },
      body: data,
      json: true
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
    });

  }

  //   private updateUser2() {
  //     var data = { "user_metadata" : { "watchlist": [8888]}};
  //     var userid = this.userProfile.user_id;
  //     let headers = new Headers({
  //       'content-type': 'application/json',
  //       authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9VVXhRMFpGUmtaRU5EbEJNRVpGUkVReFJUSXpNemcxTXpFM05rWkZOMEZDTlRkQk9EVXdNZyJ9.eyJpc3MiOiJodHRwczovL3plbW92aWUuZXUuYXV0aDAuY29tLyIsInN1YiI6InlmRVcwQVE2VWc5cFY0cXZ5Vzc1MlNkZmtuNGNES0ZLQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3plbW92aWUuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE0OTc3NDU3MTUsImlhdCI6MTQ5NzY1OTMxNSwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IifQ.uRaMIzOpxiggMWeeIWTICY2RiMcO1qwxvO9S-QRBD447KMRkkmExd5KeEnPMkymGJqHxGsMAuCMOx56LBAXoVPdXEGyFsGA2lYn4xKgHqa2J0HCidAzxYlaU0E0oayPlcRoZfvDpCF3_iwB9ahS6-Iydy2-6dOhkKiXEhzSA-yQWctdKVdXb8XOmTBqPdemjQRZfxV78mer70PvEfjqLabNPOvp3GYPupnto-UdQa0Eu0XPeaf-5g-CUYhDl5YJEoy1WarRvNnzVf1UAnMLytyisJ1hTJ4c4H30_9fOSEZSU0MTpqrh4tL_pP0JK1cDnI-NiM-ZnWEmoc1D88NAstw'
  //     });
  //     let options = new RequestOptions({ headers: headers });
  // console.log("ici");
  //     return this.http.patch('https://zemovie.eu.auth0.com/api/v2/users/'+userid,data,options )
  //       .map(res => res.json());
  //   }

}
