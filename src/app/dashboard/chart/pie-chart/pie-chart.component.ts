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
  @Input() public pieChartProp: {t: string, d: number[], l: string[]};
  public title: string;
  public pieChartData: number[];
  public pieChartLabels: Label[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [pluginDataLabels];
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
    const k: string[] = [];
    for (let i = 0; i <= this.pieChartLabels.length; i++){
      const n = this.random_rgba();
      if (!k.includes(n)){
        k.push(n);
      }
    }
    this.pieChartColors = [{backgroundColor: k }];
  }

  public random_rgba(): string {
    const o = Math.round;
    const r = Math.random;
    const s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.5 + ')';
  }
}
