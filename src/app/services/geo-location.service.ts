import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor() { }

  getLocation() {
    return new Observable<GeolocationCoordinates>(observer => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
        },
        (error) => {
          observer.error(error);
        }
      );
    })
  
    // When the consumer unsubscribes, clean up data ready for next subscription
  }
}
