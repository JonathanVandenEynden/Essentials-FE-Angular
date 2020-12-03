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

const routes: Routes =
  [
    {path: 'adminlogin', component: AdminLoginComponent},
    {path: 'admin/home', component: AdminHomeComponent},
    {path: 'admin/addOrganization', component: AddOrganizationComponent},
  ];

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent,
    AddOrganizationComponent
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
