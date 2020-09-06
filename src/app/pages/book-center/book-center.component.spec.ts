import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCenterComponent } from './book-center.component';
import { BooksService } from 'src/app/services/http-requests/books.service';
import { of } from 'rxjs';
import { bookDataMock } from '../../testing/mockData/bookDataMock';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BookCenterComponent', () => {
  let component: BookCenterComponent;
  let fixture: ComponentFixture<BookCenterComponent>;
  let booksService:BooksService;
  beforeEach(async(() => {
    booksService = jasmine.createSpyObj('bookService',['getBooks'])
    booksService.getBooks = jasmine.createSpy('booksService').and.returnValue(of([bookDataMock]))
    TestBed.configureTestingModule({
      declarations: [ BookCenterComponent ],
      providers: [ {provide:BooksService, useValue:booksService}],
      schemas: [NO_ERRORS_SCHEMA],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit should call fetchAndSetBooks', () => {
    spyOn(component,'fetchAndSetBooks')
    component.ngOnInit()

    expect(component.fetchAndSetBooks).toHaveBeenCalled()
  });

  it('fetchAndSetBooks should call booksService.getBooks', () => {
    component.fetchAndSetBooks()

    expect(booksService.getBooks).toHaveBeenCalled()
  });

  it('fetchAndSetBooks should set sortedAndFilteredBookData with booksService.getBooks response', () => {
    component.fetchAndSetBooks()

    expect(component.sortedAndFilteredBookData).toEqual([bookDataMock])
  });

  it('fetchAndSetBooks should call applyFilters', () => {
    spyOn(component,'applyFilters')
    component.fetchAndSetBooks()

    expect(component.applyFilters).toHaveBeenCalled()
  });

  it('setReadStatus should call applyFilters', () => {
    spyOn(component,'applyFilters')
    component.setReadStatus({value:true})

    expect(component.applyFilters).toHaveBeenCalled()
  });

  it('setReadStatus should set selectedReadSort', () => {
    component.setReadStatus({value:'read'})

    expect(component.selectedReadSort).toEqual('read')
  });


  it('setDateSort should call sortByDate', () => {
    spyOn(component,'sortByDate')
    component.setDateSort('newest')

    expect(component.sortByDate).toHaveBeenCalled()
  });

  it('setDateSort should set selectedDateSort', () => {
    spyOn(component,'sortByDate')

    component.setDateSort({value:'newest'})

    expect(component.selectedDateSort).toEqual({value:'newest'})
  });

  it('handleBookReadButton should call fetchAndSetBooks', () => {
    spyOn(component,'fetchAndSetBooks')

    component.handleBookReadButton()

    expect(component.fetchAndSetBooks).toHaveBeenCalled()
  });

  it('applyfilters should set filtered books to sortedAndFilteredBookData, filtering out the books that dont match the filters', () => {
    let filteredBookDataMock = {...bookDataMock}
    filteredBookDataMock.catagories = ['mockCategory']
    filteredBookDataMock.hasBeenReadByUser = true

    component.selectedCategory = {value:'mockCategory'}
    component.selectedReadSort = 'read'
    component.bookData = [bookDataMock,filteredBookDataMock]    
    component.applyFilters()

    expect(component.sortedAndFilteredBookData).toEqual([filteredBookDataMock])
  });

  
  
  
});
