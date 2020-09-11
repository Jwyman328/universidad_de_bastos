import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeHeaderComponent } from './large-header.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LargeHeaderComponent', () => {
  let component: LargeHeaderComponent;
  let fixture: ComponentFixture<LargeHeaderComponent>;
  let route:Router
  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports:[RouterTestingModule.withRoutes([]),],

      declarations: [ LargeHeaderComponent ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeHeaderComponent);
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
