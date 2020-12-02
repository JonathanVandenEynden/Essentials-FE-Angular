import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from '../material/material.module';
import { AccountComponent } from './account/account.component';
import {NavigationModule} from "../navigation/navigation.module";

const routes: Routes =
[
  { path: 'logIn', component: LoginComponent },
  { path: 'account', component: AccountComponent }
];

@NgModule({
  declarations: [LoginComponent, AdminComponent, AccountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NavigationModule
  ]
})
export class UserModule { }
