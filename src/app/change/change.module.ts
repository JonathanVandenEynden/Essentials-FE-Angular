import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { GroupComponent } from './group/group.component';
import { SurveyComponent } from './survey/survey.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AddChangeComponent } from './add-change/add-change.component';
import { ChangeButtonComponent } from './change-button/change-button.component';
import {ChangeResolver} from './changeResolver';
import {NavigationModule} from '../navigation/navigation.module';
import {LottieModule} from 'ngx-lottie';
import {MaterialModule} from '../material/material.module';
import { DeleteChangeComponent } from './delete-change/delete-change.component';
import { UpdateChangeComponent } from './update-change/update-change.component';

const changeRoutes: Routes =
[
  { path: 'home', component: HomeComponent },
  { path: 'add', component: AddChangeComponent},
  { path: 'update', component: UpdateChangeComponent },
  { path: 'delete', component: DeleteChangeComponent},
  { path: 'survey/:id', component: SurveyComponent, resolve: { change : ChangeResolver }},
];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [RoadmapComponent, GroupComponent, SurveyComponent, HomeComponent, AddChangeComponent, ChangeButtonComponent, UpdateChangeComponent, DeleteChangeComponent ],
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
  ]
})
export class ChangeModule { }
