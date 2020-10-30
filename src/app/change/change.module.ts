import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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
import {SurveyOverviewComponent} from './survey/surveyOverview/surveyOverview.component';
import {GroupComponent} from './group/group.component';
import {RoadmapComponent} from './roadmap/roadmap.component';
import {SurveyResolver} from './survey/surveyResolver';
import {SurveyButtonComponent} from './survey/survey-button/survey-button.component';

const changeRoutes: Routes =
[
  { path: 'home', component: HomeComponent },
  { path: 'add', component: AddChangeComponent},
  { path: 'update/:id', component: UpdateChangeComponent, resolve: { change : ChangeResolver } },
  { path: 'delete', component: DeleteChangeComponent},
  { path: 'surveyOverview/:id', component: SurveyOverviewComponent, resolve: { change : ChangeResolver }},
];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [RoadmapComponent, GroupComponent, SurveyOverviewComponent, SurveyButtonComponent, HomeComponent, AddChangeComponent, ChangeButtonComponent, UpdateChangeComponent, DeleteChangeComponent ],
  imports: [
    NavigationModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(changeRoutes),
    LottieModule
  ]
})
export class ChangeModule { }
