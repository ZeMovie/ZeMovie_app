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


import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfilComponent } from './components/profil/profil.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

@NgModule({
    declarations: [
        AppComponent,
        MoviesComponent,
        ProfilComponent,
        WatchlistComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing,
        BrowserAnimationsModule,
        ToastModule.forRoot()
    ],
    providers: [
        AuthGuard,
        Auth,
        appRoutingProviders,
        {provide: ToastOptions, useClass: CustomOption}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
