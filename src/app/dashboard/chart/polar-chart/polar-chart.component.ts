import {Component, Input, OnInit} from '@angular/core';
import {ChartType} from 'chart.js';
import {Label, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.css']
})
export class PolarChartComponent implements OnInit {
  @Input() public polarChartProp: {t: string, d: number[], l: string[]};
  public title: string;
  public polarAreaChartLabels: Label[];
  public polarAreaChartData: SingleDataSet;
  public polarAreaLegend = true;
  public pieChartColors;
  public polarAreaChartType: ChartType = 'polarArea';

  constructor() { }

  ngOnInit(): void {
    this.title = this.polarChartProp.t;
    this.polarAreaChartLabels = this.polarChartProp.l;
    this.polarAreaChartData = this.polarChartProp.d;
    const k: string[] = [];
    for (let i = 0; i <= this.polarAreaChartLabels.length; i++){
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
