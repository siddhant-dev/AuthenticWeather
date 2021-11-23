import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrentWeather } from '../interface';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss']
})
export class CompassComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() wind: any;
  

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['wind'].currentValue != changes['wind'].previousValue){
        this.getRotation();
        this.getSpeed();
      }
  }

  getRotation() {
    return  'rotate(-' + this.wind.deg + 'deg)';
  }
  getSpeed() {
    const temp = Math.round(this.wind.speed * 3.6);
    if(temp<10){
      return `0${temp}`
    }
    return temp;
  }

}
