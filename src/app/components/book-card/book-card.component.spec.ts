import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpRequestInterceptorMock } from 'src/testing/httpMocks/HttpRequestInterceptorMock';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BooksService } from 'src/app/services/http-requests/books.service';
import { UserAuthDataService } from 'src/app/services/http-requests/userData/user-auth-data.service';
import { UserAuthDataMockService } from 'src/app/services/http-requests/userData/user-auth-data-mock.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { bookCardMockData } from '../../../testing/mockData/bookCardMockData';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let booksService: BooksService;
  beforeEach(async(() => {
    booksService = jasmine.createSpyObj('BooksService', ['getBooks']);
    booksService.addBookRead = jasmine
      .createSpy('addBookRead')
      .and.returnValue(of(['mockResponse']));
    booksService.removeBookRead = jasmine
      .createSpy('removeBookRead')
      .and.returnValue(of(['mockResponse']));

    TestBed.configureTestingModule({
      declarations: [BookCardComponent],
      //imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]),],
      providers: [
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: HttpRequestInterceptorMock,
        //   multi: true,
        // },
        {
          provide: BooksService,
          useValue: booksService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    component.bookData = bookCardMockData;
    fixture.detectChanges();
  });

  it('should have removeBookFromisReadBooks call booksService.addBookRead with bookId ', () => {
    component.removeBookFromisReadBooks();
    expect(booksService.addBookRead).toHaveBeenCalledWith(bookCardMockData._id);
  });

  it('should have booksService.addBookRead emit handleBookReadButton event', () => {
    spyOn(component.handleBookReadButton, 'emit');

    component.removeBookFromisReadBooks();
    expect(component.handleBookReadButton.emit).toHaveBeenCalledWith(
      'bookLikeStatusChanged'
    );
  });

  it('should have addBookToIsReadBooks call booksService.removeBookRead with bookId ', () => {
    component.addBookToIsReadBooks();
    expect(booksService.removeBookRead).toHaveBeenCalledWith(bookCardMockData._id);
  });

  it('should have booksService.addBookRead emit handleBookReadButton event', () => {
    spyOn(component.handleBookReadButton, 'emit');

    component.addBookToIsReadBooks();
    expect(component.handleBookReadButton.emit).toHaveBeenCalledWith(
      'bookLikeStatusChanged'
    );
  });

  it('should have ngOninit set bookIsRead', () => {

    component.ngOnInit();
    expect(component.isRead).toEqual(bookCardMockData.hasBeenReadByUser)
  });

  it('should have readIt call addBookToIsReadBooks when isRead is true', () => {
    spyOn(component, 'addBookToIsReadBooks')
    component.isRead = true
    component.readIt();
    expect(component.addBookToIsReadBooks).toHaveBeenCalled()
  });

  it('should have readIt call removeBookFromisReadBooks when isRead is true', () => {
    spyOn(component, 'removeBookFromisReadBooks')
    component.isRead = false
    component.readIt();
    expect(component.removeBookFromisReadBooks).toHaveBeenCalled()
  });

});
