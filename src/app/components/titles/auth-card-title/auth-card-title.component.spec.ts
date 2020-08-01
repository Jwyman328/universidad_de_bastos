import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCardTitleComponent } from './auth-card-title.component';

describe('AuthCardTitleComponent', () => {
  let component: AuthCardTitleComponent;
  let fixture: ComponentFixture<AuthCardTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCardTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
