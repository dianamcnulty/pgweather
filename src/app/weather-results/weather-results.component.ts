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
  @Input() currentSite: any;
  @Input() skillLevel: string;
  maxWindForSkill: number = 12;
  windDirDisplay: string;

  constructor() { }
  ngOnInit() {
    this.setMaxWindForSkill();
  }
  ngOnChanges() {
    if(this.weather){
      this.getIdealWindDir();
      this.getIdealConditions();
      this.getDescriptionRating();
      this.setMaxWindForSkill();
      this.setWindDirDisplay();
    }
  }
  setWindDirDisplay(){
    if (this.weather.wind.deg){
      let deg = this.weather.wind.deg
      switch (true){
        case (deg >= 0 && deg <= 30) || (deg > 330 && deg <=360):
          this.windDirDisplay = "N"
          break;
        case deg >30 && deg <=60:
          this.windDirDisplay = "NE"
          break;
        case deg > 60 && deg <= 120:
          this.windDirDisplay = "E"
          break;
        case deg >120 && deg<=150:
          this.windDirDisplay = "SE"
          break;
        case deg > 150 && deg <=210:
          this.windDirDisplay = "S"
          break;
        case deg > 210 && deg <=240:
          this.windDirDisplay = "SW"
          break;
        case deg > 240 && deg <=300:
          this.windDirDisplay = "W"
          break;
        case deg > 300 && deg <= 330:
          this.windDirDisplay = "NW"
          break;
      }
    }
  }
  getIdealWindDir(){
    if(this.currentSite === {}){
      this.idealWindDir = true
    } else if(this.currentSite){
      if (this.weather.wind.deg > this.currentSite.minWindDir && this.weather.wind.deg < this.currentSite.maxWindDir){
        this.idealWindDir = true
      } else {
        this.idealWindDir = false
      }
    }
    return this.idealWindDir
  }

    setMaxWindForSkill(){
      switch(this.skillLevel){
        case "P2":
        this.maxWindForSkill = 12
        break;
        case "P3":
        this.maxWindForSkill = 15
        break;
        case "P4":
        this.maxWindForSkill = 20
        break;
      }
    }
  getDescriptionRating(){
    this.descriptionRating = "safe";
    let conditions = 'Chance of ';
    this.weather.weather.forEach(condition => {
      conditions += condition.description + ", ";
      switch (condition.main){
        case "Rain" || "Hail" || "Sleet":

          this.descriptionRating = "danger";
          break;
        case "Snow":

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
    console.log(this.descriptionRating, this.weather.weather)
    return this.descriptionRating;

  }
  getIdealConditions() {
    console.log("description rating is", this.descriptionRating)
    if (this.weather.wind.speed > 12 || (this.weather.wind.gust - this.weather.wind.speed) > 5 || this.weather.main.temp < 30) {
      console.log("too windy or too cold")
      this.idealConditions = false
      return this.idealConditions
    }
    if(this.getDescriptionRating() === "danger"){
      console.log('dangerous description')
      this.idealConditions = false
      return this.idealConditions
    }
    console.log("description rating is", this.descriptionRating)
    if (this.getIdealWindDir() === false) {
      console.log('wrong wind direction')
      this.idealConditions = false
      return this.idealConditions
    }
    console.log("good conditions")
    this.idealConditions = true
    return this.idealConditions
  }

}
