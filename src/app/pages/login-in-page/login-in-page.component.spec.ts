import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInPageComponent } from './login-in-page.component';
import { By } from '@angular/platform-browser';
import { AuthCardComponent } from 'src/app/components/auth-card/auth-card.component';
import { BackgroundImageComponent } from 'src/app/components/background-image/background-image.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LoginFormComponent } from 'src/app/components/forms/login-form/login-form.component';
import { NavigateToPageButtonComponent } from 'src/app/components/buttons/navigate-to-page-button/navigate-to-page-button.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MainNavBarComponent } from 'src/app/components/nav-bars/main-nav-bar/main-nav-bar.component';

let component: LoginInPageComponent;
describe('LoginInPageComponent', () => {
  /*   beforeEach(() => {
    component = new LoginInPageComponent();
  });

  it('should have correct background image', () => {
    component.backgroundImageUrl =
      'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500';
  }); */

  let fixture: ComponentFixture<LoginInPageComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginInPageComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
