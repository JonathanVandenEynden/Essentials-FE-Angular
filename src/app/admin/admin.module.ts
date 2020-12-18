import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../material/material.module';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddOrganizationComponent} from './add-organization/add-organization.component';
import {AddAssessmentComponent} from './add-assessment/add-assessment.component';
import { AdminOrganizationComponent } from './admin-organization/admin-organization.component';
import {OrganizationResolver} from './admin-organization/organizationResolver';
import { OrganizationFilterPipe } from './admin-home/organization-filter.pipe';

const routes: Routes =
  [
    {path: 'adminlogin', component: AdminLoginComponent},
    {path: 'admin/home', component: AdminHomeComponent},
    {path: 'admin/organization/:id', component: AdminOrganizationComponent, resolve: {organization: OrganizationResolver}},
    {path: 'admin/addOrganization', component: AddOrganizationComponent},
    {path: 'admin/addAssessment', component: AddAssessmentComponent}
  ];

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent,
    AddOrganizationComponent,
    AddAssessmentComponent,
    AdminOrganizationComponent,
    OrganizationFilterPipe
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
