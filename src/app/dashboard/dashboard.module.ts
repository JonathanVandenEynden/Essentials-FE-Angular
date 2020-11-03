import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationModule} from '../navigation/navigation.module';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LottieModule} from 'ngx-lottie';
import {RouterModule, Routes} from '@angular/router';
import { BaseChartDirective, ChartsModule, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HighlightModule } from 'ngx-highlightjs';
import { DashboardRoadmapItemComponent } from './dashboard-roadmap-item/dashboard-roadmap-item.component';
import { DashboardSurveyComponent } from './dashboard-survey/dashboard-survey.component';
import { DashbboardProjectComponent } from './dashboard-project/dashbboard-project.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartComponent } from './charts/chart/chart.component';


const dashboardRoutes: Routes =
  [
    { path: 'project', component: DashbboardProjectComponent },
    { path: 'roadmapitem', component: DashboardRoadmapItemComponent },
    { path: 'survey', component: DashboardSurveyComponent }
  ];

@NgModule({
  declarations: [DashbboardProjectComponent, DashboardRoadmapItemComponent, DashboardSurveyComponent, DashbboardProjectComponent, ChartsComponent, ChartComponent],
  imports: [
    NavigationModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(dashboardRoutes),
    ChartsModule,
    HighlightModule,
    LottieModule,
  ],
  providers: [],
  exports: []
})
export class DashboardModule {
  constructor() {
    BaseChartDirective.unregisterPlugin(ChartDataLabels);
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }
}
