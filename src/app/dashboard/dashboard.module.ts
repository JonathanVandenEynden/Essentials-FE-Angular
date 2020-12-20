import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationModule} from '../navigation/navigation.module';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LottieModule} from 'ngx-lottie';
import {RouterModule, Routes} from '@angular/router';
import { HighlightModule } from 'ngx-highlightjs';
import { DashboardSurveyComponent } from './dashboard-survey/dashboard-survey.component';
import { DashbboardProjectComponent } from './dashboard-project/dashbboard-project.component';
import {ChartModule} from './chart/chart.module';

const dashboardRoutes: Routes =
  [
    { path: 'project', component: DashbboardProjectComponent },
    { path: 'survey', component: DashboardSurveyComponent }
  ];

@NgModule({
  declarations: [DashbboardProjectComponent, DashboardSurveyComponent, DashbboardProjectComponent],
  imports: [
    NavigationModule,
    MaterialModule,
    ChartModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(dashboardRoutes),
    HighlightModule,
    LottieModule,
  ],
  providers: [],
  exports: []
})
export class DashboardModule {}
