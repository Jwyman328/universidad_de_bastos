import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { VideoCenterComponent } from './pages/video-center/video-center.component';
import { VideoHeaderComponent } from './components/video-header/video-header.component';
import { FormButtonComponent } from './components/buttons/form-button/form-button.component';
import { NavigateToPageButtonComponent } from './components/buttons/navigate-to-page-button/navigate-to-page-button.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { ErrorMessageComponent } from './components/messages/error-message/error-message.component';
import {SpinnerComponent} from './components/spinner/spinner.component'
import { HttpClientModule } from '@angular/common/http';
import { FormButtonComponent2 } from './components/buttons/form-button2/form-button.component';
import { SignupFormComponent2 } from './components/forms/signup-form/signup-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginInPageComponent } from './pages/login-in-page/login-in-page.component';
import { AuthCardTitleComponent } from './components/titles/auth-card-title/auth-card-title.component';
import { AllVideosComponent } from './pages/all-videos/all-videos.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { SmallHeaderComponent } from './components/small-header/small-header.component';
import { DisplayNoteComponent } from './components/display-note/display-note.component';
import { BookCenterComponent } from './pages/book-center/book-center.component';
import { BookCenterHeaderComponent } from './components/book-center-header/book-center-header.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { NagivationHeaderComponent } from './components/nagivation-header/nagivation-header.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FormButtonComponent2,
    HeaderComponent,
    VideoCenterComponent,
    VideoHeaderComponent,
    FormButtonComponent,
    NavigateToPageButtonComponent,
    AuthCardComponent,
    ErrorMessageComponent,
    SpinnerComponent,
    SignupFormComponent2,
    LoginFormComponent,
    LoginInPageComponent,
    //

    SignUpPageComponent,
    AuthCardTitleComponent,
    AllVideosComponent,
    VideoCardComponent,
    SelectBoxComponent,
    SmallHeaderComponent,
    DisplayNoteComponent,
    BookCenterComponent,
    BookCenterHeaderComponent,
    BookCardComponent,
    NagivationHeaderComponent,
    //AuthCardComponent,
    //SignupFormComponent2
    //FormButtonComponent,
    //LoginFormComponent,
    //NavigateToPageButtonComponent,
    //SpinnerComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
