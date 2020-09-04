// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { BookCardComponent } from './book-card.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { HttpRequestInterceptorMock } from 'src/testing/httpMocks/HttpRequestInterceptorMock';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { BooksService } from 'src/app/services/http-requests/books.service';
// import { UserAuthDataService } from 'src/app/services/http-requests/userData/user-auth-data.service';
// import { UserAuthDataMockService } from 'src/app/services/http-requests/userData/user-auth-data-mock.service';
// import { RouterTestingModule } from '@angular/router/testing';

// import { bookCardMockData } from '../../../testing/mockData/bookCardMockData';

// fdescribe('BookCardComponent', () => {
//   let component: BookCardComponent;
//   let fixture: ComponentFixture<BookCardComponent>;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [BookCardComponent],
//       imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]),
//     ],
//       providers: [
//         {
//           provide: HTTP_INTERCEPTORS,
//           useClass: HttpRequestInterceptorMock,
//           multi: true,
//         },
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BookCardComponent);
//     component = fixture.componentInstance;
//     let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

//     let userAuthStateService = new UserAuthDataService(httpClientSpy);
//     component.booksService = new BooksService(httpClientSpy, httpClientSpy);
//     component.bookData = bookCardMockData;
//     fixture.detectChanges();
//   });

//   it('should have removeBookFromisReadBooks emit handleBookReadButton event ', () => {
//     component.removeBookFromisReadBooks();
//     expect(component).toBeTruthy();
//   });
// });
