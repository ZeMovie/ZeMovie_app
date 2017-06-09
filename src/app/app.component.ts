import { Component, ViewContainerRef, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from './services/movie.service';
import { Auth } from './services/auth.service';
import { SearchService } from './services/search.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService, Auth, SearchService]
})

export class AppComponent {
  search: string;
  searchRes: Array<Object>;
  popularList: Array<Object>;

  constructor(public auth: Auth, public _movieService: MovieService, public toastr: ToastsManager, public _vcr: ViewContainerRef, public _searchService: SearchService) {
    this.toastr.setRootViewContainerRef(_vcr);
  }
}
