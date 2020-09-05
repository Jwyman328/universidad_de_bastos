import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserAuthDataService } from 'src/app/services/http-requests/userData/user-auth-data.service';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userAuthDataService:UserAuthDataService
  let userName;
  beforeEach(async(() => {
    userAuthDataService = jasmine.createSpyObj('UserAuthDataService', ['getUserName','logOutUser'])
    userName = 'mockUserName'
    userAuthDataService.getUserName = jasmine.createSpy('getUserName').and.returnValue(userName)
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ HeaderComponent ],
      providers:[{provide:UserAuthDataService, useValue:userAuthDataService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have ngOninit set user to UserAuthDataService userName', () => {
    component.ngOnInit()
    expect(component.user).toEqual(userName)
  });

  it('should have showOptions set isShowOptions to true', () => {
    component.isShowOptions = false
    component.showOptions()
    expect(component.isShowOptions).toEqual(true)
  });

  it('should have hideOptions set isShowOptions to false', () => {
    component.isShowOptions = true
    component.hideOptions()
    expect(component.isShowOptions).toEqual(false)
  });

  it('should have logOut call the userAuthService logout', () => {
    component.logOut()
    expect(userAuthDataService.logOutUser).toHaveBeenCalled()
  });

  it('should have goToHomePage route to homePage', () => {
      spyOn(component.route,'navigate')
    component.goToHomePage()
    expect(component.route.navigate).toHaveBeenCalledWith(['/'])
  });
});
