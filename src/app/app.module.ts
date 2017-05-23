import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfilComponent } from './components/profil/profil.component';

@NgModule({
    declarations: [
        AppComponent,
        MoviesComponent,
        HomeComponent,
        ProfilComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [
        appRoutingProviders,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
