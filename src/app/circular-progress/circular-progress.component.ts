import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss']
})
export class CircularProgressComponent implements OnInit, OnChanges {

  
  @Input() humidity:any;
  @Input() stroke: string = "";
  radius:number = 65;
  circumference = 2 * Math.PI * this.radius;
  dashoffset: number = 0;

  constructor() {}

  ngOnInit() {
    this.progress(this.humidity);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['humidity'].currentValue !== changes['humidity'].previousValue){
      this.progress(changes['humidity'].currentValue);
    }

  }

  private progress(value: number) {
    const progress = (value) / 100;
    console.log(value);
    this.dashoffset = this.circumference * (1 - progress);

  }

}
