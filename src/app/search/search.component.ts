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
  zip: any;
  flyingSites: any;
  stateList: Array<string> =  [];
  currentStateSites: Array<any> = []
  currentState: string = 'Select a State'
  currentSite: any;
  skillLevel: string = "P2"

  constructor(private searchService: SearchService) { }

  findWeather(zip){
    this.currentSite = undefined
    this.searchSubject.next(zip) // .next informs subscribers of searchSubject that change happened
  }
  ngOnInit() {
    this.searchSubject.debounceTime(1000) // wait 1 second after the user input
    .distinctUntilChanged()
    .subscribe(zip => {
        this.searchService.getWeather(zip)
        .subscribe((response) => {
          this.weather = response.json()
          console.log(this.weather)
        });
    })
    this.searchService.getFlyingSites().subscribe(response=>{
      this.flyingSites = response.json().flyingSites
      this.flyingSites.forEach(site => {
        if(!this.stateList.includes(site.state)){
          this.stateList.push(site.state)
        }
      })
    }
    )
  }
  getCurrentStateSites(state){
    this.currentStateSites = []
    this.flyingSites.forEach(site =>{
      if (site.state == state) {
        this.currentStateSites.push(site)
      }
    })
  }
  setCurrentSite(site){
    this.currentSite = site

  }
}
