import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PolarChartComponent } from './polar-chart/polar-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { BaseChartDirective, ChartsModule, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@NgModule({
  declarations: [PieChartComponent, PolarChartComponent, BarChartComponent, DoughnutChartComponent, RadarChartComponent],
  exports: [
    PieChartComponent,
    BarChartComponent,
    PolarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ]
})
export class ChartModule {
  constructor() {
    BaseChartDirective.unregisterPlugin(ChartDataLabels);
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }
}
