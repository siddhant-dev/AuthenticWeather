import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

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
      else if(description.toLowerCase().includes("broken")){
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
