import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {
  @Input() public radarChartProp: {t: string, d: ChartDataSets[], l: string[]};
  public title: string;
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[];
  public radarChartData: ChartDataSets[];
  public radarChartType: ChartType = 'radar';
  public radarChartColors;

  constructor() { }

  ngOnInit(): void {
    this.title = this.radarChartProp.t;
    this.radarChartLabels = this.radarChartProp.l;
    this.radarChartData = this.radarChartProp.d;
    const k: string[] = [];
    for (let i = 0; i <= this.radarChartLabels.length; i++){
      const n = this.random_rgba();
      if (!k.includes(n)){
        k.push(n);
      }
    }
    this.radarChartColors = [{backgroundColor: k }];
  }

  public random_rgba(): string {
    const o = Math.round;
    const r = Math.random;
    const s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.5 + ')';
  }
}
