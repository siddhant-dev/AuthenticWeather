import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-temp-forcast',
  templateUrl: './temp-forcast.component.html',
  styleUrls: ['./temp-forcast.component.scss']
})
export class TempForcastComponent implements OnInit, OnChanges {

  @Input() list: Array<any> = [];

  constructor() { }
  chart: any = {};
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list'].currentValue != changes['list'].previousValue) {
      this.chartDataSet(changes['list'].currentValue);
    }
  }

  public lineChartData: ChartConfiguration['data'] = { datasets: [] };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {
        ticks: { color: 'white', font: { size: 12, family: 'Roboto' } },
        grid: { color: 'transparent' }
      },
      y: {
        ticks: { color: 'white', font: { family: 'Roboto', size: 12 } },
        grid: { color: '#4F4F4F' }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };
  public lineChartType:ChartType = 'line';


  chartDataSet(list: Array<any>) {
    let temp: Array<number> = [];
    let time: Array<string> = [];
    list.forEach(x => {
      temp.push(Math.round(x.main.temp));
      let d = new Date(x.dt * 1000);
      let t = d.getHours();
      if (t > 12) {
        time.push(`${t - 12}pm`);
      } else if (t < 12) {
        time.push(`${t}am`)
      }
      else
        time.push(`${t} pm`);
    });
    temp.push(Math.min.apply(null, temp) - 2);
    temp.push(Math.max.apply(null, temp) + 1);  
    console.log(temp);
    this.lineChartData = {
      datasets: [{
        data: temp, label: 'Temperature', 
        borderColor: '#F2C94C',
        backgroundColor: 'rgba(242, 201, 76,0.5)',
        pointBackgroundColor: 'yellow',
        fill: 'origin',
      }], 
      labels: time
    };
  }
}
