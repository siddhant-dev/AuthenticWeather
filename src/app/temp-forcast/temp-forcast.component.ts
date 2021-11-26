import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-temp-forcast',
  templateUrl: './temp-forcast.component.html',
  styleUrls: ['./temp-forcast.component.scss']
})
export class TempForcastComponent implements OnInit, OnChanges {

  @Input() list: Array<any>= [];

  constructor() { }
  chart: any = {};
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['list'].currentValue != changes['list'].previousValue){
        this.chartDataSet(changes['list'].currentValue);
      }
  }
  
  public lineChartData: ChartDataSets[] = [
    { }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      xAxes:[{
        ticks: { fontColor: 'white', fontSize: 12, fontFamily: 'Roboto' },
        gridLines: { color: 'transparent' }
      }],
      yAxes:[{
        ticks: { fontColor: 'white', fontSize: 12, fontFamily: 'Roboto' },
        gridLines: { color: '#4F4F4F' }
      }]
    },
    legend: {
      display: false
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#F2C94C',
      backgroundColor: 'rgba(242, 201, 76,0.5)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  chartDataSet(list: Array<any>) {
    let temp:Array<number> = [];
    let time:Array<string> = [];
    list.forEach(x => {
      temp.push(Math.round(x.main.temp));
      let d = new Date(x.dt*1000);
      let t = d.getHours();
      if(t>12) {
        time.push(`${t-12}pm`);
      }else if(t<12){
        time.push(`${t}am`)
      }
      else 
        time.push(`${t} pm`);
    });
    temp.push(Math.min.apply(null, temp) - 2)
    this.lineChartData = [{data: temp, label: 'Temperature'}];
    this.lineChartLabels = time;
  }
}
