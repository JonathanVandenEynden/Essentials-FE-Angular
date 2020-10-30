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
import {RoadmapComponent} from './roadmap/roadmapView/roadmap.component';
import {GroupComponent} from './group/group.component';
import {RoadmapItemButtonComponent} from './roadmap/roadmapItem-button/roadmapItem-button.component';
import {AddSurveyComponent} from './roadmap/survey/add-survey/add-survey.component';
import {DeleteSurveyComponent} from './roadmap/survey/delete-survey/delete-survey.component';
import { UpdateSurveyComponent } from './roadmap/survey/update-survey/update-survey.component';
import { RoadmapItemDetailComponent } from './roadmap/roadmap-item-detail/roadmap-item-detail.component';
import {RoadmapItemResolver} from './roadmap/roadmapItemResolver';

const changeRoutes: Routes =
  [
    {path: 'home', component: HomeComponent},
    {path: 'add', component: AddChangeComponent},
    {path: 'update/:id', component: UpdateChangeComponent, resolve: {change: ChangeResolver}},
    {path: 'delete', component: DeleteChangeComponent},
    {path: 'roadmap/:id', component: RoadmapComponent, resolve: {change: ChangeResolver}},
    {path: 'roadmapDetail/:id', component: RoadmapItemDetailComponent, resolve: {change: RoadmapItemResolver}},
  ];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [RoadmapComponent, GroupComponent, HomeComponent, AddChangeComponent, ChangeButtonComponent, UpdateChangeComponent, DeleteChangeComponent, RoadmapComponent, RoadmapItemButtonComponent, AddSurveyComponent, DeleteSurveyComponent, UpdateSurveyComponent, RoadmapItemDetailComponent],
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
export class ChangeModule {
}
