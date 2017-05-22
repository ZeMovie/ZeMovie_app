import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { StormpathConfiguration, StormpathModule } from 'angular-stormpath';

export function stormpathConfig(): StormpathConfiguration {
 let spConfig: StormpathConfiguration = new StormpathConfiguration();
 spConfig.endpointPrefix = 'http://localhost:3000';
 return spConfig;
}

@NgModule({
    declarations: [
        AppComponent,
        MoviesComponent,
        HomeComponent
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
