import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime'; // delays the action within subscribe
import 'rxjs/add/operator/distinctUntilChanged';
import { SearchService } from './search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  weather: any;
  searchSubject = new Subject();
  idealConditions: false;
  idealWindDir: boolean = true;

  constructor(private searchService: SearchService) { }

  findWeather(zip){
    console.log('zip is', zip)
    this.searchSubject.next(zip) // .next informs subscribers of searchSubject that change happened
  }
  ngOnInit() {
    this.searchSubject.debounceTime(1000) // wait 1 second after the user input
    .distinctUntilChanged()
    .subscribe(zip => {
        this.searchService.createApiObservable(zip)
        .subscribe((response) => {
          console.log(response.json())
          this.weather = response.json()
          this.getIdealWindDir()
          this.getIdealConditions()
        });
    })

  }
  getIdealWindDir(){
    switch(this.weather.name){
      case "South Paris":
        if (this.weather.wind.deg > 120 && this.weather.wind.deg > 310){
          this.idealWindDir = true
        } else {
          this.idealWindDir = false
        }
        break;
      case "Blue Hill":
        if (this.weather.wind.deg > 60 && this.weather.wind.deg > 190){
          this.idealWindDir = true
        } else {
          this.idealWindDir = false
        }
        break;
      case "Frankfort":
        if (this.weather.wind.deg > 170 && this.weather.wind.deg > 310){
          this.idealWindDir = true
        } else {
          this.idealWindDir = false
        }
        break;
      case "Sullivan":
        if (this.weather.wind.deg > 45 && this.weather.wind.deg > 250){
          this.idealWindDir = true
        } else {
          this.idealWindDir = false
        }
        break;
      default:
        this.idealWindDir = true
    }
    return this.idealWindDir
  }
  getIdealConditions() {
    console.log("getIdealConditions() is running")
    if (this.weather.wind.speed > 12 || (this.weather.wind.gust - this.weather.wind.speed) > 5 || this.weather.main.temp < 30) {
      console.log("too windy or too cold")
      this.idealConditions = false
      return this.idealConditions
    }
    this.weather.weather.forEach(condition => {
      if((condition.description.includes('rain'))||
        (condition.description.includes('hail')) || (condition.description.includes('sleet')) ||
        (condition.description.includes('snow'))){
          console.log("bad conditions")
          this.idealConditions = false
          return this.idealConditions
        }
    })

    if (this.getIdealWindDir() === false) {
      this.idealConditions = false
      return this.idealConditions
    }
    this.idealConditions = true
    return this.idealConditions
  }

}
