import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UserAuthDataService } from 'src/app/services/http-requests/userData/user-auth-data.service';
import { Router } from '@angular/router';
import { LoginUserService } from 'src/app/services/http-requests/login-user.service';
import { of } from 'rxjs';
//let handleLoginSubmitSpy: {jasmine.Spy};
let testBedService;

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let router: Router;
  let userAuthDataService: UserAuthDataService;
  let loginUserService: LoginUserService;
  let postLoginUserResponse

  beforeEach(async(() => {
    userAuthDataService = jasmine.createSpyObj('UserAuthDataService', [
      'setToken',
      'setUsername',
    ]);
    loginUserService = jasmine.createSpyObj('LoginUserService',['postLoginUser','handleRequestSuccess','handleRequestError'])
    postLoginUserResponse = {token:'mockToken', username:'mockUsername'}
    loginUserService.postLoginUser = jasmine.createSpy('loginUserService').and.returnValue(of(postLoginUserResponse))
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: UserAuthDataService, useValue: userAuthDataService },
        { provide: LoginUserService, useValue: loginUserService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    //handleLoginSubmitSpy = jasmine.createSpyObj(<any>'handleLoginSubmit')
    testBedService = TestBed.get(UserAuthDataService);
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call postLoginUser when loginform is valid', () => {
    spyOnProperty(component.loginForm, 'valid').and.returnValue(true)

    component.handleLoginSubmit()
    expect(loginUserService.postLoginUser).toHaveBeenCalled()
  });

  it('should call authUserService setToken with token if postLoginUser is successful', () => {
    spyOnProperty(component.loginForm, 'valid').and.returnValue(true)
    
    component.handleLoginSubmit()
    expect(userAuthDataService.setToken).toHaveBeenCalledWith(postLoginUserResponse.token)
  });

  it('should call authUserService setUsername  if postLoginUser is successful', () => {
    spyOnProperty(component.loginForm, 'valid').and.returnValue(true)
    
    component.handleLoginSubmit()
    expect(userAuthDataService.setUsername).toHaveBeenCalled()
  });

  it('should call handleRequestSuccess   if postLoginUser is successful', () => {
    spyOnProperty(component.loginForm, 'valid').and.returnValue(true)
    
    component.handleLoginSubmit()
    expect(loginUserService.handleRequestSuccess).toHaveBeenCalled()
  });

});
