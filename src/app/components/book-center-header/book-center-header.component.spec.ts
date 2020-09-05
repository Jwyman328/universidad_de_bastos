import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCenterHeaderComponent } from './book-center-header.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookCenterHeaderComponent', () => {
  let component: BookCenterHeaderComponent;
  let fixture: ComponentFixture<BookCenterHeaderComponent>;
  let route:Router
  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports:[RouterTestingModule.withRoutes([]),],

      declarations: [ BookCenterHeaderComponent ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCenterHeaderComponent);
    route = TestBed.get(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should route to homepage on call of goToHomePage', () => {
    spyOn(route,'navigate')
    component.goToHomePage()
    expect(component.route.navigate).toHaveBeenCalledWith(['/'])
  });
});
