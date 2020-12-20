import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {LottieModule} from 'ngx-lottie';
import {DeleteChangeComponent} from './delete-change/delete-change.component';
import {UpdateChangeComponent} from './update-change/update-change.component';
import {MaterialModule} from '../material/material.module';
import {HomeComponent} from './home/home.component';
import {AddChangeComponent} from './add-change/add-change.component';
import {ChangeResolver} from './changeResolver';
import {ChangeButtonComponent} from './change-button/change-button.component';
import {NavigationModule} from '../navigation/navigation.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RoadmapViewComponent} from './roadmap/roadmapView/roadmapView.component';
import {GroupComponent} from './group/group.component';
import {RoadmapItemButtonComponent} from './roadmap/roadmapItem-button/roadmapItem-button.component';
import {AddSurveyComponent} from './roadmap/survey/add-survey/add-survey.component';
import {DeleteSurveyComponent} from './roadmap/survey/delete-survey/delete-survey.component';
import { UpdateSurveyComponent } from './roadmap/survey/update-survey/update-survey.component';
import { RoadmapItemDetailComponent } from './roadmap/roadmap-item-detail/roadmap-item-detail.component';
import {RoadmapItemResolver} from './roadmap/roadmapItemResolver';
import { SurveyButtonComponent } from './roadmap/survey/survey-button/survey-button.component';
import { AddRoadmapItemComponent } from './roadmap/add-roadmap-item/add-roadmap-item.component';
import { UpdateRoadmapItemComponent } from './roadmap/update-roadmap-item/update-roadmap-item.component';
import { DeleteRoadmapItemComponent } from './roadmap/delete-roadmap-item/delete-roadmap-item.component';
import { SurveyChoiceDialogComponent } from './roadmap/survey/survey-choice-dialog/survey-choice-dialog.component';
import { RoadmapEmployeeInformationComponent } from './roadmap/roadmap-employee-information/roadmap-employee-information.component';
import {FlexLayoutModule} from "@angular/flex-layout";

const changeRoutes: Routes =
  [
    {path: 'home', component: HomeComponent},
    {path: 'add', component: AddChangeComponent},
    {path: 'update/:id', component: UpdateChangeComponent, resolve: {change: ChangeResolver}},
    {path: 'delete', component: DeleteChangeComponent},
    {path: 'roadmap/:id', component: RoadmapViewComponent, resolve: {change: ChangeResolver}},
    {path: 'roadmapItemDetail/:id', component: RoadmapItemDetailComponent, resolve: {roadmapItem: RoadmapItemResolver}},
    {path: 'roadmapItemDetail/:id/Employees', component: RoadmapEmployeeInformationComponent, resolve: {roadmapItem: RoadmapItemResolver}},
    {path: 'addSurvey/:id', component: AddSurveyComponent, resolve: {roadmapItem: RoadmapItemResolver}},
    {path: 'updateSurvey/:id', component: UpdateSurveyComponent, resolve: {roadmapItem: RoadmapItemResolver}},
    {path: 'group/:id', component: GroupComponent, resolve: {change: ChangeResolver}},
    {path: 'addRoadmapItem/:id', component: AddRoadmapItemComponent, resolve: {change: ChangeResolver}},
    {path: 'updateRoadmapItem/:id', component: UpdateRoadmapItemComponent, resolve: {roadmapItem: RoadmapItemResolver}}
  ];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [
    RoadmapViewComponent,
    GroupComponent,
    HomeComponent,
    AddChangeComponent,
    ChangeButtonComponent,
    UpdateChangeComponent,
    DeleteChangeComponent,
    RoadmapViewComponent,
    RoadmapItemButtonComponent,
    AddSurveyComponent,
    DeleteSurveyComponent,
    UpdateSurveyComponent,
    RoadmapItemDetailComponent,
    SurveyButtonComponent,
    AddRoadmapItemComponent,
    UpdateRoadmapItemComponent,
    DeleteRoadmapItemComponent,
    SurveyChoiceDialogComponent,
    RoadmapEmployeeInformationComponent,
  ],
  imports: [
    NavigationModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(changeRoutes),
    LottieModule,
    FlexLayoutModule
  ]
})
export class ChangeModule {
}
