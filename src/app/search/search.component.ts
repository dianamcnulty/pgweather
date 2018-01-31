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

  constructor(private searchService: SearchService) { }

  findWeather(zip){
    console.log('zip is', zip)
    this.searchSubject.next(zip) // .next informs subscribers of searchSubject that change happened
  }
  ngOnInit() {
    this.searchSubject.debounceTime(1000) // wait 1 second after the user input
    .distinctUntilChanged()
    .subscribe(zip => {
        this.searchService.getWeather(zip)
        .subscribe((response) => {
          console.log(response.json())
          this.weather = response.json()
        });
    })
    this.searchService.getFlyingSites().subscribe(response=>{
      this.flyingSites = response.json().flyingSites
      this.flyingSites.forEach(site => {
        if(!this.stateList.includes(site.state)){
          this.stateList.push(site.state)
        }
      })
      console.log('flying sites', this.stateList)
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
    console.log('state sites', this.currentStateSites)
  }
  setCurrentSite(site){
    this.currentSite = site

  }
}
