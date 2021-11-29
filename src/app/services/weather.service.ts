import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, observable, Observable } from 'rxjs';
import { Description } from '../interface';
import { GeoLocationService } from './geo-location.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = environment.apiKey;
  baseURL = "https://api.openweathermap.org/data/2.5/";
  lat = sessionStorage.getItem('lat');
  long = sessionStorage.getItem('long');

  constructor(public http: HttpClient) { 
   }

  getWeatherInfo(): Observable<any> {
    return this.http.get(this.baseURL + "forecast?lat=" + this.lat + "&lon=" + this.long + "&units=metric&appid="
     + this.apiKey).pipe(map((weather:any) => {
      return weather;
    }));
  }


  getWeatherIcon(main: string, description: string): Description {
    let d: Description = {className: "", message: "", part1: "", keyword: "", part2: "", textClass: "", subMessage: ""};
    if (main.toLowerCase() === "thunderstorm") {
      d.className = "thunder";
      d.message = "Save yourself. It's a fucking strom."
      d.subMessage = "Thunderstrom accompained by heavy rain."
      d.part1 = "Save yourself. It's a fucking"
      d.keyword = "storm."
      d.part2 = "";
      d.textClass = "amber";
      return d;
    }
    else if (main.toLowerCase() === "drizzle" || main.toLowerCase() === "mist") {
      d.className = "light-rain";
      d.message = "It's fucking raining outside."
      d.subMessage = "Chances of very light rain"
      d.part1 = "It's fucking"
      d.keyword = "raining."
      d.part2 = "outside";
      d.textClass = "primary";
      return d;
    }
    else if (main.toLowerCase() === "snow") {
      d.className = "snow";
      d.message = "It's fucking cold outside. Like a freezer"
      d.subMessage = "It's cold and snowing."
      d.part1 = "It's fucking"
      d.keyword = "cold."
      d.part2 = "outside. Like a freezer";
      d.textClass = "pimary-light";
      return d;
    }
    else if (main.toLowerCase() === "clear") {
      d.className = "clear";
      d.message = "Fucking love is in the air"
      d.subMessage = "Its clear beautiful day."
      d.part1 = "Fucking"
      d.keyword = "love"
      d.part2 = "is in the air.";
      d.textClass = "danger";
      return d;
    }
    else if (main.toLowerCase() === "rain") {
      if (description.toLowerCase().includes("light") || description.toLowerCase().includes("moderate")) {
        d.className = "light-rain";
        d.message = "It's fucking raining outside."
        d.subMessage = "Chances of very light rain"
        d.part1 = "It's fucking"
        d.keyword = "raining."
        d.part2 = "outside";
        d.textClass = "primary";
        return d;
      }
      else {
        d.className = "rain";
        d.message = "It's fucking raining outside."
        d.subMessage = "Chances of rain."
        d.part1 = "It's fucking"
        d.keyword = "raining."
        d.part2 = "outside";
        d.textClass = "primary";
        return d;
      }
    }
    else if (main.toLowerCase() === "clouds") {
      if (description.toLowerCase().includes("scattered") || description.toLowerCase().includes("few")) {
        d.className = "light-clouds";
        d.message = "It's just fucking grey."
        d.subMessage = "Very little to no natural light, cloudy weather."
        d.part1 = "It's just fucking"
        d.keyword = "grey."
        d.part2 = "";
        d.textClass = "gray";
        return d;
      }
      else if (description.toLowerCase().includes("broken")) {
        d.className = "partial-clouds";
        d.message = "It's just fucking grey."
        d.subMessage = "Very little to no natural light, cloudy weather."
        d.part1 = "It's just fucking"
        d.keyword = "grey."
        d.part2 = "";
        d.textClass = "gray";
        return d;
      }
      else {
        d.className = "clouds";
        d.message = "It's just fucking grey."
        d.subMessage = "Very little to no natural light, cloudy weather."
        d.part1 = "It's just fucking"
        d.keyword = "grey."
        d.part2 = "";
        d.textClass = "gray";
        return d;
      }
    }
    else{
      d.className = "haze";
      d.message = "Fucking pollution everywhere."
      d.subMessage = "Pollution has impacted the weather and it might be difficult breathe."
      d.part1 = "Fucking"
      d.keyword = "pollution."
      d.part2 = "everywhere.";
      d.textClass = "danger";
      return d;
    }
  }
}
