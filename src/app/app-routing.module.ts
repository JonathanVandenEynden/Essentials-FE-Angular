import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import {DashboardComponent} from './dashboard/dashboard.component';

const appRoutes: Routes =
 [
  {
    path: 'change',
    loadChildren: () => import('./change/change.module').then(mod => mod.ChangeModule),
    data: { preload: true }
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule),
    data: { preload: true }
  },
   { path: 'dashboard', component: DashboardComponent},
   { path: '', redirectTo: 'user/LogIn', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
