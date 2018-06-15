import { NgModule }             from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { AppComponent }   from './app.component';
import { HomeComponent }   from './home/home.component';
import { NotfoundComponent }   from './notfound/notfound.component';
import { AboutComponent }   from './about/about.component';
import { DashboardComponent }   from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'about' , component: AboutComponent },
  { path: 'dashboard' , component: DashboardComponent },
  { path: '**' , component: NotfoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
