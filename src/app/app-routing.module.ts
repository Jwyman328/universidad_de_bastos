import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoCenterComponent } from './pages/video-center/video-center.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginInPageComponent } from './pages/login-in-page/login-in-page.component';
import { AuthGuard } from './services/auth-guards/AuthGuard.service';
import { AllVideosComponent } from './pages/all-videos/all-videos.component';
import { BookCenterComponent } from './pages/book-center/book-center.component';
import { ArticlesCenterComponent } from './pages/articles-center/articles-center.component';

const routes: Routes = [
  //{ path: '', component: HomepageComponent,canActivate: [AuthGuard] },
  { path: 'video-center/:videoUrl/:videoTitle', component: VideoCenterComponent,canActivate: [AuthGuard] },
  { path: '', component: HomepageComponent,canActivate: [AuthGuard] },
  { path: 'videos-center', component: AllVideosComponent,canActivate: [AuthGuard] },
  { path: 'book-center', component: BookCenterComponent,canActivate: [AuthGuard] },
  { path: 'articles-center', component: ArticlesCenterComponent,canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'login', component: LoginInPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
