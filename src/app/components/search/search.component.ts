import { Component } from '@angular/core';
import {SearchService} from '../../services/search.service';

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
    searchStr : string;
    searchRes : Array<Object>;

    constructor(private _searchService: SearchService){

    }
    // Pour la recherche de film
    searchMovie(){
        this._searchService.searchMovie(this.searchStr).subscribe(res => {
        this.searchRes = res.results;
    })
  }

}

