// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { SpinnerComponent } from './spinner.component';
// import { By } from '@angular/platform-browser';

// describe('SpinnerComponent', () => {
//   let component: SpinnerComponent;
//   let fixture: ComponentFixture<SpinnerComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SpinnerComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SpinnerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should display is loading text when isLoading is true', () => {
//     //
//     component.isSpinning = true;
//     fixture.detectChanges();
//     const loadingSpinnerElement:HTMLElement = fixture.debugElement.query(By.css('.is-loading')).nativeElement
//     expect(loadingSpinnerElement.textContent).toEqual('...loading');
//   });

//   it('should not display element isLoading is false', () => {
//     component.isSpinning = false;
//     fixture.detectChanges();
//     const loadingSpinnerElement = fixture.debugElement.queryAll(By.css('.is-loading')).length
//     expect(loadingSpinnerElement).toEqual(0);
//   });
  
// });

