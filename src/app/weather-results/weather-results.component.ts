import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-results',
  templateUrl: './weather-results.component.html',
  styleUrls: ['./weather-results.component.css']
})
export class WeatherResultsComponent implements OnInit {
  @Input() weather: any;
  idealConditions: boolean = false;
  idealWindDir: boolean = true;
  descriptionRating: string= 'safe';
  conditionDescription: string= 'default';

  constructor() { }
  ngOnInit() {}
  ngOnChanges() {
    if(this.weather){
      this.getIdealWindDir();
      this.getIdealConditions();
      this.getDescriptionRating();
    }
  }
  getIdealWindDir(){
    console.log('getIdealWindDir is running')
    switch(this.weather.name){
      case "South Paris":
        if (this.weather.wind.deg > 120 && this.weather.wind.deg < 310){
          this.idealWindDir = true
        } else {
          this.idealWindDir = false
        }
        break;
      case "Blue Hill":
        if (this.weather.wind.deg > 60 && this.weather.wind.deg < 190){
          this.idealWindDir = true
        } else {
          this.idealWindDir = false
        }
        break;
      case "Frankfort":
        if (this.weather.wind.deg > 170 && this.weather.wind.deg < 310){
          this.idealWindDir = true
        } else {
          this.idealWindDir = false
        }
        break;
      case "Sullivan":
        if (this.weather.wind.deg > 45 && this.weather.wind.deg < 250){
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

  getDescriptionRating(){
    console.log('getDescriptionRating is running')
    let conditions = 'Chance of '
    this.weather.weather.forEach(condition => {
      console.log("condition is,", condition)
      conditions += condition.description + ", "
      switch (condition.main){
        case "Rain" || "Hail" || "Sleet":
          console.log("rain")
          this.descriptionRating = "danger";
          break;
        case "Snow":
        console.log("snow")
          if (this.descriptionRating != 'danger'){
            this.descriptionRating = "caution";
          }
          break;
        default:
        if (this.descriptionRating != 'danger' && this.descriptionRating != 'caution'){
          this.descriptionRating = "safe";
        }

      }
    })
    conditions = conditions.substring(0, conditions.length - 2)
    this.conditionDescription = conditions
    return this.descriptionRating;

  }
  getIdealConditions() {
    console.log("getIdealConditions() is running")
    if (this.weather.wind.speed > 12 || (this.weather.wind.gust - this.weather.wind.speed) > 5 || this.weather.main.temp < 30) {
      console.log("too windy or too cold")
      this.idealConditions = false
      return this.idealConditions
    }
    if(this.getDescriptionRating() === "danger"){
      this.idealConditions = false
      return this.idealConditions
    }
    if (this.getIdealWindDir() === false) {
      this.idealConditions = false
      return this.idealConditions
    }
    this.idealConditions = true
    return this.idealConditions
  }

}
