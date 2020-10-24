import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {RouterModule, Routes} from '@angular/router';

@NgModule({
  declarations: [NavBarComponent],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavigationModule { }
