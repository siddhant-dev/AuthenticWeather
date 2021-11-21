import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = environment.apiKey;
  baseURL = "https://api.openweathermap.org/data/2.5/"

  constructor(public http: HttpClient) { }

  getWeatherInfo(lat: number, long: number): Observable<any> {
    return this.http.get(this.baseURL + "forecast?lat=" + lat + "&lon=" + long + "&units=metric&appid="
     + this.apiKey).pipe(map((weather:any) => {
      return weather;
    }));
  }


  getWeatherIcon(main: string, description: string): string {
    if (main.toLowerCase() === "thunderstorm") {
      return "thunder";
    }
    else if (main.toLowerCase() === "drizzle" || main.toLowerCase() === "mist") {
      return "light-rain";
    }
    else if (main.toLowerCase() === "snow") {
      return "snow";
    }
    else if (main.toLowerCase() === "clear") {
      return "clear";
    }
    else if (main.toLowerCase() === "rain") {
      if (description.toLowerCase().includes("light") || description.toLowerCase().includes("moderate")) {
        return "light-rain";
      }
      else {
        return "rain"
      }
    }
    else if (main.toLowerCase() === "clouds") {
      if (description.toLowerCase().includes("scattered") || description.toLowerCase().includes("few")) {
        return "light-clouds";
      }
      else if (description.toLowerCase().includes("broken")) {
        return "partial-clouds";
      }
      else {
        return "clouds";
      }
    }
    else
      return "haze";
  }
}
