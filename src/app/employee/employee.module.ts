import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeOverviewComponent } from './employee-overview/employee-overview.component';
import {NavigationModule} from '../navigation/navigation.module';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule, Routes} from '@angular/router';
import {LottieModule} from 'ngx-lottie';

const routes: Routes =
  [
    {path: 'overview', component: EmployeeOverviewComponent},
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
