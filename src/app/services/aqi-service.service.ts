import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AQI } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class AqiService {
  apiKey = environment.apiKey;
  baseURL = "https://api.openweathermap.org/data/2.5/";
  lat = sessionStorage.getItem('lat');
  long = sessionStorage.getItem('long');

  constructor(public http: HttpClient) { }

  getvalResponse(): Observable<Array<AQI>> {
    return this.http.get(`${this.baseURL}air_pollution?lat=${this.lat}&lon=${this.long}&appid=${this.apiKey}`)
    .pipe(map((val:any) => {
      const index = val.list[0].components
      return [this.valPM25(index.pm2_5), this.valPM10(index.pm10), this.valNO2(index.no2), this.valOzone(index.o3)]
    }))
  }

  linear(high:number, low:number, conhigh:number, conlow:number, conc:number) {
    const val = ((conc - conlow)/(conhigh-conlow))*(high-low)+low;
    return Math.round(val);
  }

  valPM25(conc: number):AQI {
    let val: any;
    if (conc >= 0 && conc < 12.1) {
      val = this.linear(50, 0, 12, 0, conc);
    } else if (conc >= 12.1 && conc < 35.5) {
      val = this.linear(100, 51, 35.4, 12.1, conc);
    } else if (conc >= 35.5 && conc < 55.5) {
      val = this.linear(150, 101, 55.4, 35.5, conc);
    } else if (conc >= 55.5 && conc < 150.5) {
      val = this.linear(200, 151, 150.4, 55.5, conc);
    } else if (conc >= 150.5 && conc < 250.5) {
      val = this.linear(300, 201, 250.4, 150.5, conc);
    } else if (conc >= 250.5 && conc < 350.5) {
      val = this.linear(400, 301, 350.4, 250.5, conc);
    } else if (conc >= 350.5 && conc < 500.5) {
      val = this.linear(500, 401, 500.4, 350.5, conc);
    } else {
      val = 500;
    }
    let col: string = '#6FCF97';
    if(val<61) {
      col = '#6FCF97'
    } else if(val>60 && val<121){
      col = '#F2C94C'
    } 
    else if(val>120) {
      col = '#EB5757';
    }
    return {
      name: 'PM 2.5',
      concentration: conc,
      value: val,
      maxVal: 500,
      strokeColor: col,
      message: 'Particulate Matter less than 2.5 microns'
    };
  }

  valPM10(conc: number): AQI {
    let val: number
    if (conc >= 0 && conc < 55) {
      val = this.linear(50, 0, 54, 0, conc);
    } else if (conc >= 55 && conc < 155) {
      val = this.linear(100, 51, 154, 55, conc);
    } else if (conc >= 155 && conc < 255) {
      val = this.linear(150, 101, 254, 155, conc);
    } else if (conc >= 255 && conc < 355) {
      val = this.linear(200, 151, 354, 255, conc);
    } else if (conc >= 355 && conc < 425) {
      val = this.linear(300, 201, 424, 355, conc);
    } else if (conc >= 425 && conc < 505) {
      val = this.linear(400, 301, 504, 425, conc);
    } else if (conc >= 505 && conc < 605) {
      val = this.linear(500, 401, 604, 505, conc);
    } else {
      val = 500;
    }
    let col:string = '#6FCF97';
    if(val<101) {
      col = '#6FCF97'
    } else if(val>100 && val<351){
      col = '#F2C94C'
    } 
    else if(val>350) {
      col = '#EB5757';
    }
    return {
      name: 'PM 10',
      concentration: conc,
      value: val,
      maxVal: 500,
      strokeColor: col,
      message: 'Particulate Matter less than 10 microns'
    };
  }

  valNO2(conc: number):AQI {
      let val;
      let c = (Math.floor(conc)) / 1000;
      if (c >= 0 && c < .054) {
        val = this.linear(50, 0, .053, 0, c);
      } else if (c >= .054 && c < .101) {
        val = this.linear(100, 51, .100, .054, c);
      } else if (c >= .101 && c < .361) {
        val = this.linear(150, 101, .360, .101, c);
      } else if (c >= .361 && c < .650) {
        val = this.linear(200, 151, .649, .361, c);
      } else if (c >= .650 && c < 1.250) {
        val = this.linear(300, 201, 1.249, .650, c);
      } else if (c >= 1.250 && c < 1.650) {
        val = this.linear(400, 301, 1.649, 1.250, c);
      } else if (c >= 1.650 && c <= 2.049) {
        val = this.linear(500, 401, 2.049, 1.650, c);
      } else {
        val = 500;
      }
      let col: string = '#6FCF97';
    if(val<81) {
      col = '#6FCF97'
    } else if(val>80 && val<281){
      col = '#F2C94C'
    } 
    else if(val>280) {
      col = '#EB5757';
    }
      return {
        name: 'NO2',
        concentration: conc,
        value: val,
        maxVal: 500,
        strokeColor: col,
        message: 'Nitrous DiOxide concenteration'
      };
    }

    valOzone(conc: number):AQI {
     let val: number;
      let c = (Math.floor(conc)) / 1000;
    
      if (c >= 0 && c < .055) {
        val = this.linear(50, 0, 0.054, 0, c);
      } else if (c >= .055 && c < .071) {
        val = this.linear(100, 51, .070, .055, c);
      } else if (c >= .071 && c < .086) {
        val = this.linear(150, 101, .085, .071, c);
      } else if (c >= .086 && c < .106) {
        val = this.linear(200, 151, .105, .086, c);
      } else if (c >= .106 && c < .201) {
        val = this.linear(300, 201, .200, .106, c);
      } else {
        val = 300;
      }
      let col: string = '#6FCF97';
    if(val<101) {
      col = '#6FCF97'
    } else if(val>100 && val<209){
      col = '#F2C94C'
    } 
    else if(val>208) {
      col = '#EB5757';
    }
      return {
        name: 'Ozone',
        concentration: conc,
        value: val,
        maxVal: 300,
        strokeColor: col,
        message: 'Ozone Concentration (the lower the value the better)'
      };
    }

}

