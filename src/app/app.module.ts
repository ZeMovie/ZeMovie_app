import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './custom-toastr';
import {ToastOptions} from 'ng2-toastr';
import { AuthGuard }  from './services/auth-guard.service';
import { Auth } from './services/auth.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { CarouselModule,CollapseModule,PaginationModule,TooltipModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SearchComponent } from './components/search/search.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SeenlistComponent } from './components/seenlist/seenlist.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('id_token'))
  }), http, options);
}

@NgModule({
    declarations: [
        AppComponent,
        MoviesComponent,
        MovieComponent,
        ProfilComponent,
        WatchlistComponent,
        SeenlistComponent,
        SearchComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing,
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        CarouselModule.forRoot(),
        CollapseModule.forRoot(),
        PaginationModule.forRoot(),
        TooltipModule.forRoot(),
    ],
    providers: [
        AuthGuard,
        Auth,
        {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]},
        appRoutingProviders,
        {provide: ToastOptions, useClass: CustomOption}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
