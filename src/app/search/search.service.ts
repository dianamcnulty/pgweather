import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class SearchService {
  constructor(private http: Http) { }

  getWeather (zip) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&appid=052f26926ae9784c2d677ca7bc5dec98&&units=imperial')
  }
  getFlyingSites(){
    console.log('requesting flying sites.')
    return this.http.get('http://localhost:4741/pgsites/')
  }
}
