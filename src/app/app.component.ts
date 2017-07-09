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

  extendSearchbar() {
      document.getElementById("inputSearch").classList.add("clickedInput");
      document.getElementById("inputSearch").classList.add("focus");
      document.getElementById("inputSearch").focus();
    }

  hideSearchbar() {
    document.getElementById("inputSearch").classList.remove("clickedInput");
  }

  mobileMenu(state) {
    if (state == "open") {
    document.getElementById("menu").classList.add("mobile-menu");
    document.getElementById("close-menu").classList.remove("hide");
    document.getElementById("open-menu").classList.add("hide");
  } else {
    document.getElementById("menu").classList.remove("mobile-menu");
    document.getElementById("close-menu").classList.add("hide");
    document.getElementById("open-menu").classList.remove("hide");
  }
  }
}
