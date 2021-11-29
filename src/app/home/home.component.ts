import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentWeather, Description } from '../interface';
import { GeoLocationService } from '../services/geo-location.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locationFlag: boolean = false;
  currentWeather: CurrentWeather = {
    temp: 0, humidity: 0, description: "",
    wind: { speed: 0, deg: 0 }, cityName: "", list: [], main: ""
  };
  cityName: string = "";
  weatherDescription: Description = {
    className: "", message: "",
    part1: "", keyword: "", part2: "", textClass: "", subMessage: ""
  };
  sunrise: number = 0;
  sunset: number = 0;
  moment: string = "";
  sub!: Subscription;
  loc!: Subscription;

  constructor(private weather: WeatherService, private geo: GeoLocationService) { }
  ngOnInit() {
    this.getCurrentLocation();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.loc.unsubscribe();
  }



  getCurrentTimeStamp() {
    let date = new Date();
    let timestamp = date.getTime() / 1000;
    return Math.round(timestamp);
  }

  getCurrentLocation() {
    this.loc = this.geo.getLocation().subscribe({
      next: pos => {
        sessionStorage.setItem('lat', pos.latitude + '');
        sessionStorage.setItem('long', pos.longitude + '');
        this.locationFlag = true;
        this.getWeather();
      },
      error: err => {
        this.locationFlag = false;
        this.weatherDescription.message = "No Weather updates for you !!!";
        this.weatherDescription.part1 = "No Weather updates for you !!!";
        this.weatherDescription.subMessage = err.message;
      }
    });

  }

  getWeather() {
    this.sub = this.weather.getWeatherInfo().subscribe(data => {
      this.currentWeather.cityName = data.city.name;
      this.currentWeather.list = data.list.splice(0, 9);
      this.currentWeather.temp = data.list[0].main.temp;
      this.currentWeather.humidity = data.list[0].main.humidity;
      this.currentWeather.description = data.list[0].weather[0].description;
      this.currentWeather.wind = data.list[0].wind;
      this.currentWeather.main = data.list[0].weather[0].main;
      this.weatherDescription = this.weather.getWeatherIcon(this.currentWeather.main,
        this.currentWeather.description);
      this.sunrise = data.city.sunrise;
      this.sunset = data.city.sunset;
      this.getDayorNight();
    });
  }

  getDayorNight() {
    const currentTime = this.getCurrentTimeStamp();

    if (currentTime < this.sunrise && currentTime < this.sunset) {
      this.moment = "night";
    } else if (currentTime >= this.sunrise && currentTime <= this.sunset) {
      this.moment = "day";
    }
    else {
      this.moment = "night";
    }
  }


}
