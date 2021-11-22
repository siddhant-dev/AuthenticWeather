import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() forcast: any;
  color: string = "#f2f2f2";

  constructor() { }

  ngOnInit(): void {
    console.log(this.forcast);
  }

}
