import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //import FormsModule
import { HttpModule } from '@angular/http'; //import module
import { SearchService } from './search/search.service';


import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { WeatherResultsComponent } from './weather-results/weather-results.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    WeatherResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
