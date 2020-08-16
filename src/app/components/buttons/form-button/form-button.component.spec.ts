import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormButtonComponent } from './form-button.component';
import { By } from '@angular/platform-browser';

describe('FormButtonComponent', () => {
  let component: FormButtonComponent;
  let fixture: ComponentFixture<FormButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create button with uppercase title text of buttonText input', () => {
    component.buttonText = 'buttonTitle'
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.form-button'))
    expect(buttonElement.nativeElement.textContent).toEqual(' BUTTONTITLE ')
  });
});
