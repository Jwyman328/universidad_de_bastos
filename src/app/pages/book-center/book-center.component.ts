import { Component, OnInit } from '@angular/core';
import { bookData } from 'src/app/data/bookData';
import { BooksService } from '../../services/http-requests/books.service';

@Component({
  selector: 'app-book-center',
  templateUrl: './book-center.component.html',
  styleUrls: ['./book-center.component.scss']
})
export class BookCenterComponent implements OnInit {
  bookData;
  selectedReadSort: "read" | "not read" = 'read';
  selectedDateSort: {value:"newest"} | {value: "oldest"} ={ value: "newest"};
  sortedBookData;
  readStatusOptions = [{displayName:'read', value:'read'}, {displayName:'not read', value:'not read'}]
  dateOptions = [{displayName:'newest', value:'newest'}, {displayName:'oldest', value:'oldest'}]

  constructor(private booksService:BooksService) { }

  ngOnInit(): void {
    this.fetchAndSetBooks()
  }

  fetchAndSetBooks(){
    this.booksService.getBooks().subscribe((res)=>{
      this.bookData = res

      this.sortBooksByAllCurrentSorts()
    })
  }

  sortBooksByAllCurrentSorts(){
    this.sortByDate(this.selectedDateSort)
    this.sortBooksByReadStatus(this.selectedReadSort)
  }

  sortByReadStatus(event){
    this.sortBooksByReadStatus(event.value)
  }

  sortBooksByReadStatus(readStatus) {
    this.selectedReadSort = readStatus

    let readBooks = [];
    let unreadBooks = [];
    const bookDataSorted = this.bookData.map((bookData)=>{
      if (bookData.hasBeenReadByUser === true){
        readBooks.push(bookData)
      }else{
        unreadBooks.push(bookData)
      }
    })

    let allBooksSofted = []
    if (readStatus === 'read'){
      console.log(readBooks, 'red books')
      allBooksSofted = [...readBooks,...unreadBooks]
    }else{
      allBooksSofted = [...unreadBooks, ...readBooks]
    }
    
    this.bookData = allBooksSofted
  }

  sortByDate(sortType){
    let softTypeValue = sortType;
    if (sortType.value) {
      softTypeValue = sortType.value;
    }
    this.selectedDateSort = softTypeValue;
    const booksSortedByDate = [...this.bookData];
    booksSortedByDate.sort((a, b) => a.year - b.year);
    if (softTypeValue === 'newest') {
      booksSortedByDate.reverse();
    }
    this.bookData = booksSortedByDate;
  }

  handleBookReadButton(){
    this.fetchAndSetBooks()
  }

}
