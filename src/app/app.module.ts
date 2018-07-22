import { BrowserModule  } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { HeadComponent } from './head/head.component'
import { FooterComponent } from './footer/footer.component'
import { HomeComponent } from './home/home.component'
import { NotfoundComponent } from './notfound/notfound.component'
import { AboutComponent } from './about/about.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AnnouncementComponent } from './announcement/announcement.component'
import { InfoComponent } from './dashboard/info/info.component'
import { ProfileComponent } from './dashboard/profile/profile.component';
import { BlogComponent } from './blog/blog.component'
import { TimeAgoPipe } from 'time-ago-pipe';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { BlogNotfoundComponent } from './blog/blog-notfound/blog-notfound.component';
import { BlogSyncingComponent } from './blog/blog-syncing/blog-syncing.component';
import { BlogBadSyncComponent } from './blog/blog-bad-sync/blog-bad-sync.component';
import { BlogNopostComponent } from './blog/blog-nopost/blog-nopost.component';
import { BlogUserInfoComponent } from './blog/blog-user-info/blog-user-info.component';
import { ShortTimeAgoPipe } from './pipes/short-time-ago.pipe';
import { BlogPagesComponent } from './blog/blog-pages/blog-pages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    AboutComponent,
    DashboardComponent,
    AnnouncementComponent,
    InfoComponent,
    ProfileComponent,
    BlogComponent,
    TimeAgoPipe,
    BlogPostComponent,
    BlogNotfoundComponent,
    BlogSyncingComponent,
    BlogBadSyncComponent,
    BlogNopostComponent,
    BlogUserInfoComponent,
    ShortTimeAgoPipe,
    BlogPagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
