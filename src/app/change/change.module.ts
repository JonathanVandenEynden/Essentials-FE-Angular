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

const routes: Routes =
[
  { path: 'Home', component: HomeComponent },
  { path: 'Add', component: AddChangeComponent},
  { path: 'Survey/:id', component: SurveyComponent, resolve: { change : ChangeResolver } },
];

@NgModule({
  declarations: [RoadmapComponent, GroupComponent, SurveyComponent, HomeComponent, AddChangeComponent, ChangeButtonComponent ],
  imports: [
    NavigationModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class ChangeModule { }
