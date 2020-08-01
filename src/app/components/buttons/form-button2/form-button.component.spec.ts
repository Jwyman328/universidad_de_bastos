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

  it('shots submit text', () => {
    const buttonElement: HTMLElement = fixture.debugElement.query(By.css('.submit-button')).nativeElement;
    expect(buttonElement.textContent).toEqual('submit');
  });
});
