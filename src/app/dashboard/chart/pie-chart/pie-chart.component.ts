import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() public pieChartProp: {t: string, d: number[], l: string[], c: string[]};
  public title: string;
  public pieChartData: number[];
  public pieChartLabels: Label[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [pluginDataLabels];
  private colorArray = [
    'rgba(250,125,0,0.3)', 'rgba(0,250,125,0.3)', 'rgba(125,0,250,0.3)', 'rgba(96,163,250,0.3)',
    'rgba(120,28,129,0.3)', 'rgba(64,67,153,0.3)', 'rgba(72,139,194,0.3)', 'rgba(107,178,140,0.3)',
    'rgba(159,190,87,0.3)', 'rgba(210,179,63,0.3)', 'rgba(231,126,49,0.3)', 'rgba(217,33,32,0.3)',
    'rgba(185,248,211,0.3)', 'rgba(238,238,148,0.3)', 'rgba(92,119,47,0.3)', 'rgba(249,169,157,0.3)'
  ];
  public pieChartColors;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.title = this.pieChartProp.t;
    this.pieChartLabels = this.pieChartProp.l;
    this.pieChartData = this.pieChartProp.d;
    this.pieChartColors = [
      {
        backgroundColor: this.pieChartProp.c,
      },
    ];
  }
}
