import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesCenterComponent } from './articles-center.component';

describe('ArticlesCenterComponent', () => {
  let component: ArticlesCenterComponent;
  let fixture: ComponentFixture<ArticlesCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
