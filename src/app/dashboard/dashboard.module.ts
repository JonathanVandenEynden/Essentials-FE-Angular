import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavigationModule} from '../navigation/navigation.module';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LottieModule} from 'ngx-lottie';
import {RouterModule, Routes} from '@angular/router';

const dashboardRoutes: Routes =
  [
    { path: 'home', component: DashboardComponent }
  ];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    NavigationModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(dashboardRoutes),
    LottieModule,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
