import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentWeather } from '../interface';
import { GeoLocationService } from '../services/geo-location.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lat:number = 0;
  long: number = 0;
  message: string = "";
  locationFlag: boolean = false;
  subMessage:string = "";
  currentWeather: CurrentWeather = {temp: 0, humidity: 0, description: "", wind: {speed: 0, deg: 0}, cityName: "", forcast: [], main: ""};
  cityName: string = "";
  weatherIcon: string = "";
  sunrise:number = 0;
  sunset:number = 0;
  moment: string = "";
  sub!: Subscription;

  constructor(private weather: WeatherService, private location: GeoLocationService) {}
  ngOnInit() {
    this.getCurrentTimeStamp();
    
    const locationsSubscription = this.location.getLocation().subscribe(position => {
      this.lat = position.latitude;
      this.long = position.longitude;
      this.locationFlag = true;
      this.getWeather();
    }, error => {
      this.message = "No weather updated for you.";
      this.subMessage = "Look outside the window to get weather updates";
    }
    );
    setTimeout(() => {
      locationsSubscription.unsubscribe();
    }, 10000);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  

  getCurrentTimeStamp() {
    let date = new Date();
    let timestamp = date.getTime()/1000;
    return Math.round(timestamp);
  }

  async getWeather() {
    console.log(this.lat, this.long);
    
    this.sub = this.weather.getWeatherInfo(this.lat, this.long).subscribe(data => {
      this.currentWeather.cityName = data.city.name;
      this.currentWeather.forcast = data.list;
      this.currentWeather.temp = data.list[0].main.temp;
      this.currentWeather.humidity = data.list[0].main.humidity;
      this.currentWeather.description = data.list[0].weather[0].description;
      this.currentWeather.wind = data.list[0].wind;
      this.currentWeather.main = data.list[0].weather[0].main;
      this.weatherIcon = this.weather.getWeatherIcon(this.currentWeather.main, this.currentWeather.description);
      this.sunrise = data.city.sunrise;
      this.sunset = data.city.sunset;
      this.getDayorNight();
      this.message = `Fucking <span class="bold">love</span> is in the air.`;
    });
  }

  getDayorNight() {
    const currentTime = this.getCurrentTimeStamp();
    
    if(currentTime < this.sunrise && currentTime < this.sunset) {
      this.moment =  "night";
    } else if(currentTime >= this.sunrise && currentTime <= this.sunset) {
      this.moment = "day";
    }
    else{
      this.moment = "night";
    }
  }


}
