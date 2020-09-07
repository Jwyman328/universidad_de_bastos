import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NagivationHeaderComponent } from './nagivation-header.component';
import { Router } from '@angular/router';

let routerSpy;
describe('NagivationHeaderComponent', () => {
  let component: NagivationHeaderComponent;
  let fixture: ComponentFixture<NagivationHeaderComponent>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router',['navigate'])
    TestBed.configureTestingModule({
      declarations: [ NagivationHeaderComponent ],
      providers: [{ provide: Router, useValue: routerSpy }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NagivationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('navigateTo should navigate to passed in page ', () => {
    component.navigateTo('mockPage')
    expect(routerSpy.navigate).toHaveBeenCalledWith(['mockPage'])
  });
});
