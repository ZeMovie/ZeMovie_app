import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { MoviesComponent }             from './components/movies/movies.component';
import { ProfilComponent }             from './components/profil/profil.component';


const appRoutes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'popular', component: MoviesComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
