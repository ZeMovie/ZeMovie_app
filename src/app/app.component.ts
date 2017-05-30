import { Component, ViewContainerRef, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from './services/movie.service';
import { Auth } from './services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService, Auth]
})

export class AppComponent {
  search: string;
  searchRes: Array<Object>;
  popularList: Array<Object>;

  constructor(private auth: Auth, private _movieService: MovieService, private toastr: ToastsManager, private _vcr: ViewContainerRef, ) {
    this.toastr.setRootViewContainerRef(_vcr);
  }

  searchMovies(search) {
    console.log(search);
    if (search != "") {
      this._movieService.searchMovies(search).subscribe(res => {
        this.searchRes = res.results;
      })
    }
  }
}
