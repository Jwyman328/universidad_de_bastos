import { Component, OnInit } from '@angular/core';
import { bookData } from 'src/app/data/bookData';
import { BooksService } from '../../services/http-requests/books.service';
import { book } from 'src/app/models/book';

@Component({
  selector: 'app-book-center',
  templateUrl: './book-center.component.html',
  styleUrls: ['./book-center.component.scss'],
})
export class BookCenterComponent implements OnInit {
  bookData: book[] ;
  selectedReadSort: 'read' | 'not read' | 'all' = 'all';
  selectedDateSort: { value: 'newest' } | { value: 'oldest' } = {
    value: 'newest',
  };
  sortedAndFilteredBookData;
  selectedCategory = { value: 'all' };
  filterCategories = [
    { displayName: 'Todos', value: 'all' },
    { displayName: 'Sociología', value: 'sociology' },
    { displayName: 'Economía', value: 'Economía' },
    { displayName: 'Filosofía política', value: 'Filosofía política' },
    { displayName: 'Ficción', value: 'fiction' },
    { displayName: 'Derecho', value: 'Derecho' },
  ];
  readStatusOptions = [
    { displayName: 'Todos', value: 'all' },
    { displayName: 'Leido', value: 'read' },
    { displayName: 'No Leido', value: 'not read' },
  ];
  dateOptions = [
    { displayName: 'Nuevo', value: 'newest' },
    { displayName: 'Viejo', value: 'oldest' },
  ];
  isBooksLoading=true;


  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.fetchAndSetBooks();
  }

  fetchAndSetBooks() {
    this.booksService.getBooks().subscribe((res) => {
      this.bookData = res;
      this.sortedAndFilteredBookData = res;

      this.applyFilters()
      if(res.length > 0){
        this.isBooksLoading=false
      }
    });
  }
  
  setReadStatus(event) {
    this.selectedReadSort = event.value;
    this.applyFilters();
  }

  setDateSort(dateSort) {
    this.selectedDateSort = dateSort;

    this.sortByDate(this.selectedDateSort);
  }

  setCategoryFilter(selectedCategory) {
    this.selectedCategory = selectedCategory;
    this.applyFilters();
  }


  sortByDate(sortType) {
    let softTypeValue = sortType;
    if (sortType.value) {
      softTypeValue = sortType.value;
    }
    this.selectedDateSort = softTypeValue;
    const booksSortedByDate = [...this.sortedAndFilteredBookData];
    booksSortedByDate.sort((a, b) => a.year - b.year);
    if (softTypeValue === 'newest') {
      booksSortedByDate.reverse();
    }
    this.sortedAndFilteredBookData = booksSortedByDate;
  }

  handleBookReadButton() {
    this.fetchAndSetBooks();
  }

  applyFilters() {
    let filteredVideosByCategory = [];

    if (this.selectedCategory.value === 'all') {
      //
      filteredVideosByCategory = this.bookData;
    } else {
      const booksFiltered = this.bookData.filter((book) =>
        book.catagories.includes(this.selectedCategory.value)
      );
      filteredVideosByCategory = booksFiltered;
    }

    let bookDataSorted;
    let filteredVideosByReadStatus = [];

    let hasBeenReadByUser;
    if (this.selectedReadSort === 'read') {
      hasBeenReadByUser = true;

      bookDataSorted = filteredVideosByCategory.filter(
        (bookData) => bookData.hasBeenReadByUser === hasBeenReadByUser
      );
    } else if (this.selectedReadSort === 'not read') {
      hasBeenReadByUser = false;

      bookDataSorted = filteredVideosByCategory.filter(
        (bookData) => bookData.hasBeenReadByUser === hasBeenReadByUser
      );
    } else {
      bookDataSorted = filteredVideosByCategory;
    }

    this.sortedAndFilteredBookData = bookDataSorted;
    this.sortByDate(this.selectedDateSort);
  }
}
