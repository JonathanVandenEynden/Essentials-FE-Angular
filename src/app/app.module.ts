import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './navigation/nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChangeModule } from './change/change.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import {NavigationModule} from './navigation/navigation.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  imports: [
    NavigationModule,
    ChangeModule,
    UserModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
