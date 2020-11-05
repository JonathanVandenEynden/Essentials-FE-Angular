import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() public barChartProp: {t: string, d: ChartDataSets[], l: Label[]};
  public title: string;
  public barChartData: ChartDataSets[];
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartColors: Color[] = [];
  private colorArray = [
    'rgba(250,125,0,0.3)', 'rgba(0,250,125,0.3)', 'rgba(125,0,250,0.3)', 'rgba(96,163,250,0.3)',
    'rgba(120,28,129,0.3)', 'rgba(64,67,153,0.3)', 'rgba(72,139,194,0.3)', 'rgba(107,178,140,0.3)',
    'rgba(159,190,87,0.3)', 'rgba(210,179,63,0.3)', 'rgba(231,126,49,0.3)', 'rgba(217,33,32,0.3)',
    'rgba(185,248,211,0.3)', 'rgba(238,238,148,0.3)', 'rgba(92,119,47,0.3)', 'rgba(249,169,157,0.3)'
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [{
          display: true,
          ticks: {
            min: 0,
            stepSize: 1,
          }
        }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.title = this.barChartProp.t;
    this.barChartData = this.barChartProp.d;
    this.barChartLabels = this.barChartProp.l;
    this.barChartColors = [{ backgroundColor:  this.colorArray[Math.floor(Math.random() * this.colorArray.length)]}];
  }
}
