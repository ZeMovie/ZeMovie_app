import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';
import { AuthGuard }                   from './services/auth-guard.service';

import { MoviesComponent }             from './components/movies/movies.component';
import { MovieComponent }             from './components/movie/movie.component';
import { ProfilComponent }             from './components/profil/profil.component';
import { WatchlistComponent }             from './components/watchlist/watchlist.component';
import { SearchComponent } from './components/search/search.component';


const appRoutes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'popular', component: MoviesComponent },
  { path: 'upcoming', component: MoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'search', component: SearchComponent },
  { path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
