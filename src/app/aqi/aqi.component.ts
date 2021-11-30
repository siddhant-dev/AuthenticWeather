import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AQI } from '../interface';
import { AqiService } from '../services/aqi-service.service';

@Component({
  selector: 'app-aqi',
  templateUrl: './aqi.component.html',
  styleUrls: ['./aqi.component.scss']
})
export class AqiComponent implements OnInit {

  sub!: Subscription;
  aqi: Array<AQI> = [{name: '', concentration: 0, value:0, maxVal:0, message:'', strokeColor: ''}]
  constructor(private aqiService: AqiService) { }

  ngOnInit(): void {
    this.sub = this.aqiService.getvalResponse().subscribe(payload => this.aqi = payload)
    
  }

}
