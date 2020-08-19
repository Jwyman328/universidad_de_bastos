import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCenterHeaderComponent } from './book-center-header.component';

describe('BookCenterHeaderComponent', () => {
  let component: BookCenterHeaderComponent;
  let fixture: ComponentFixture<BookCenterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCenterHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCenterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
