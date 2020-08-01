import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoCenterComponent } from './pages/video-center/video-center.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginInPageComponent } from './pages/login-in-page/login-in-page.component';
import { AuthGuard } from './services/auth-guards/AuthGuard.service';
import { AllVideosComponent } from './pages/all-videos/all-videos.component';

const routes: Routes = [
  { path: '', component: HomepageComponent,canActivate: [AuthGuard] },
  { path: 'video-center/:videoUrl', component: VideoCenterComponent,canActivate: [AuthGuard] },
  { path: 'videos', component: AllVideosComponent},
  { path: 'signup', component: SignUpPageComponent },
  { path: 'login', component: LoginInPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
