import { NgModule }             from '@angular/core'
import { RouterModule, Routes, UrlSegment  } from '@angular/router'
import { HomeComponent }   from './home/home.component'
import { NotfoundComponent }   from './notfound/notfound.component'
import { AboutComponent }   from './about/about.component'
import { DashboardComponent }   from './dashboard/dashboard.component'
import { BlogComponent } from './blog/blog.component';

// A regex for blog page
// it will accept values like @mahdiyari, @mahdi-yari, @mahdi.yari
export function blogPath(url: UrlSegment[]) {
  return url.length === 1 && url[0].path.match(/^[\@]+[a-zA-Z0-9\-\.]+$/) ? ({consumed: url}) : null;
}

const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'about' , component: AboutComponent },
  { path: 'dashboard' , component: DashboardComponent },
  { matcher: blogPath, component: BlogComponent },
  { path: '**' , component: NotfoundComponent }
]

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
