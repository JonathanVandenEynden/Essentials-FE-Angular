import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavigationModule} from '../navigation/navigation.module';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LottieModule} from 'ngx-lottie';



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
    LottieModule,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
