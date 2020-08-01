// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { NavigateToPageButtonComponent } from './navigate-to-page-button.component';
// import { Router } from '@angular/router';
// import { By } from '@angular/platform-browser';

// let routerSpy;
// describe('NavigateToPageButtonComponent', () => {
//   let component: NavigateToPageButtonComponent;
//   let fixture: ComponentFixture<NavigateToPageButtonComponent>;

//   beforeEach(async(() => {
//     routerSpy = jasmine.createSpyObj('Router',['navigate'])
//     TestBed.configureTestingModule({
//       declarations: [ NavigateToPageButtonComponent ],
//       providers: [{ provide: Router, useValue: routerSpy }],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NavigateToPageButtonComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should display navigatePageText on button', () => {
//     component.navigatePageText = 'test text';
//     fixture.detectChanges();
//     const htmlElement:HTMLElement = fixture.debugElement.query(By.css('.navigate-button')).nativeElement
//     expect(htmlElement.textContent).toEqual('test text');
//   });
//   it('should hit route navigate spy with route url on click', () => {
//     component.routeUrl = 'testURL';
//     fixture.detectChanges();
//     const htmlElement:HTMLElement = fixture.debugElement.query(By.css('.navigate-button')).nativeElement
//     htmlElement.click()
//     expect(routerSpy.navigate.calls.first().args[0]).toEqual(['testURL']);
//   });
// });
