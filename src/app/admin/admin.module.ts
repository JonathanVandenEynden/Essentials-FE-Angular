import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../material/material.module';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {NavigationModule} from '../navigation/navigation.module';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddOrganizationComponent} from './add-organization/add-organization.component';
import {AddAssessmentComponent} from './add-assessment/add-assessment.component';
import { OverviewAssessmentComponent } from './overview-assessment/overview-assessment.component';
import { PresetDetailComponent } from './preset-detail/preset-detail.component';
import {DetailResolver} from './preset-detail/DetailResolver';

const routes: Routes =
  [
    {path: 'adminlogin', component: AdminLoginComponent},
    {path: 'admin/home', component: AdminHomeComponent},
    {path: 'admin/addOrganization', component: AddOrganizationComponent},
    {path: 'admin/addAssessment', component: AddAssessmentComponent},
    {path: 'admin/overview', component: OverviewAssessmentComponent},
    {path: 'admin/preset/detail/:theme', component: PresetDetailComponent, resolve: {presetSurvey: DetailResolver}}
  ];

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent,
    AddOrganizationComponent,
    AddAssessmentComponent,
    OverviewAssessmentComponent,
    PresetDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule {
}
