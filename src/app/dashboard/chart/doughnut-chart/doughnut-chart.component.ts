import {Component, Input, OnInit} from '@angular/core';
import {ChartType} from 'chart.js';
import {Label, MultiDataSet} from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {
  @Input() public doughnutChartProp: {t: string, d: MultiDataSet, l: string[]};
  public title: string;
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors;

  constructor() { }

  ngOnInit(): void {
    this.title = this.doughnutChartProp.t;
    this.doughnutChartLabels = this.doughnutChartProp.l;
    this.doughnutChartData = this.doughnutChartProp.d;
    const k: string[] = [];
    for (let i = 0; i <= this.doughnutChartLabels.length; i++){
      const n = this.random_rgba();
      if (!k.includes(n)){
        k.push(n);
      }
    }
    this.doughnutChartColors = [{backgroundColor: k }];
  }

  public random_rgba(): string {
    const o = Math.round;
    const r = Math.random;
    const s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.5 + ')';
  }
}
