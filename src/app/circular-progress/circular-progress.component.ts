import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss']
})
export class CircularProgressComponent implements OnInit, OnChanges {

  
  @Input() value:any;
  @Input() stroke: string = "";
  @Input() maxVal?: any;
  radius:number = 65;
  circumference = 2 * Math.PI * this.radius;
  dashoffset: number = 0;

  constructor() {}

  ngOnInit() {
    this.progress(this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['value'].currentValue !== changes['value'].previousValue){
      this.progress(changes['value'].currentValue);
    }

  }

  private progress(value: number) {
    let progress: number = 0;
    if(this.maxVal){
      progress = (value) / this.maxVal;
    }
    else {
      progress = (value) / 100;
    }
    console.log(value);
    this.dashoffset = this.circumference * (1 - progress);

  }

}
