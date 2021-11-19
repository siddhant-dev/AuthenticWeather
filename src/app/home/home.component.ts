import { Component, OnInit } from '@angular/core';

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

  constructor() {}
  ngOnInit() {
    this.getGeoLocation();
    this.getCurrentTimeStamp();
  }

  getGeoLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      this.locationFlag = true;
    },error => {
      if(error)
      this.message = "No weather updates for you."
      this.locationFlag = false;
    })
  }

  getCurrentTimeStamp() {
    let date = new Date();
    let timestamp = date.getTime()/1000;
    console.log(timestamp);
  }


}
