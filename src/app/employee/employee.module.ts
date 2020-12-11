import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeOverviewComponent } from './employee-overview/employee-overview.component';
import {NavigationModule} from '../navigation/navigation.module';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule, Routes} from '@angular/router';
import {LottieModule} from 'ngx-lottie';
import {HomeComponent} from '../change/home/home.component';
import {AddChangeComponent} from '../change/add-change/add-change.component';
import {UpdateChangeComponent} from '../change/update-change/update-change.component';
import {ChangeResolver} from '../change/changeResolver';
import {DeleteChangeComponent} from '../change/delete-change/delete-change.component';
import {RoadmapViewComponent} from '../change/roadmap/roadmapView/roadmapView.component';
import {RoadmapItemDetailComponent} from '../change/roadmap/roadmap-item-detail/roadmap-item-detail.component';
import {RoadmapItemResolver} from '../change/roadmap/roadmapItemResolver';
import {AddSurveyComponent} from '../change/roadmap/survey/add-survey/add-survey.component';
import {UpdateSurveyComponent} from '../change/roadmap/survey/update-survey/update-survey.component';
import {GroupComponent} from '../change/group/group.component';
import {AddRoadmapItemComponent} from '../change/roadmap/add-roadmap-item/add-roadmap-item.component';
import {UpdateRoadmapItemComponent} from '../change/roadmap/update-roadmap-item/update-roadmap-item.component';

const routes: Routes =
  [
    {path: 'employee/overview', component: HomeComponent},
  ];

@NgModule({
  declarations: [EmployeeOverviewComponent],
  imports: [
    NavigationModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    LottieModule
  ]
})
export class EmployeeModule { }
