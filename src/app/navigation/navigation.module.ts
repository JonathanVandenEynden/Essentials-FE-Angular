import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from './nav/nav.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [NavComponent, NavBarComponent],
  exports: [
    NavBarComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NavigationModule { }
