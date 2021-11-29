import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor() {
   }

  getLocation() {
    return new Observable<GeolocationCoordinates>((obs => {
      window.navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
        obs.next(pos.coords);
        obs.complete();
      },err => {
        obs.error(err);
        obs.complete();
      })
    }))
  }
}


