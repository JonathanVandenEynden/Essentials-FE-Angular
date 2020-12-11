import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChangeModule } from './change/change.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationModule } from './navigation/navigation.module';
import { LottieModule } from 'ngx-lottie';
import {MaterialModule} from './material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardModule} from './dashboard/dashboard.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {httpInterceptorProviders} from './interceptors';
import {AdminModule} from './admin/admin.module';


// tslint:disable-next-line:typedef
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    NavigationModule,
    DashboardModule,
    ChangeModule,
    UserModule,
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    LottieModule.forRoot({ player: playerFactory }),
    MaterialModule,
    NoopAnimationsModule,
    NgbModule
  ],
  providers: [httpInterceptorProviders],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
