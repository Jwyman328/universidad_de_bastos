import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupFormComponent2 } from './signup-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserAuthDataService } from 'src/app/services/http-requests/userData/user-auth-data.service';
import { SignupUserService } from 'src/app/services/http-requests/signup-user.service';
import { of } from 'rxjs';

SignupFormComponent2
describe('SignupFormComponent', () => {
  let component: SignupFormComponent2;
  let fixture: ComponentFixture<SignupFormComponent2>;
  let userAuthDataService:UserAuthDataService
  let signupUserService:SignupUserService
  let mockToken;
  beforeEach(async(() => {
    userAuthDataService = jasmine.createSpyObj('UserAuthDataService',['setToken'])
    signupUserService = jasmine.createSpyObj('SignupUserService',['postSignUpUser', 'handleRequestSuccess', 'handleRequestError'])
     mockToken = {token:'mocktoken'};
    signupUserService.postSignUpUser = jasmine.createSpy('postSignUpUser').and.returnValue(of(mockToken))
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SignupFormComponent2 ],
      providers: [{provide:UserAuthDataService, useValue:userAuthDataService}, {provide:SignupUserService, useValue:signupUserService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.signUpForm.get = jasmine.createSpy('get').and.returnValue('mockvalue')
    spyOnProperty(component.signUpForm, 'valid').and.returnValue(true)
  });

  it('on onSubmitForm call should call postSignUpUser', () => {
    
    component.onSubmitForm()
    expect(signupUserService.postSignUpUser).toHaveBeenCalled()
  });


  it('on onSubmitForm call if token return token is set on userAuthDataService', () => {
    
    component.onSubmitForm()
    expect(userAuthDataService.setToken).toHaveBeenCalledWith(mockToken.token)
  });

  it('on onSubmitForm call if token return token  signupUser.handleRequestSuccess called', () => {
    
    component.onSubmitForm()
    expect(signupUserService.handleRequestSuccess).toHaveBeenCalled()
  });

  it('on onSubmitForm call if token return token  signUpForm.reset is called', () => {
    spyOn(component.signUpForm,'reset')
    component.onSubmitForm()
    expect(component.signUpForm.reset).toHaveBeenCalled()
  });

  it('on onSubmitForm call if token return token  sroute ot home page', () => {
    spyOn(component.router,'navigate')
    component.onSubmitForm()
    expect(component.router.navigate).toHaveBeenCalledWith(['/'])
  });
});
