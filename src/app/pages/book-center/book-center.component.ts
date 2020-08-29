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
  selectedSort = 'read';
  sortedBooks;
  readStatusOptions = [{displayName:'read', value:'read'}, {displayName:'not read', value:'not read'}]
  dateOptions = [{displayName:'newest', value:'newest'}, {displayName:'oldest', value:'oldest'}]

  constructor(private booksService:BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((res)=>{
      this.bookData = res
    })
  }

  sortByReadStatus(event){
    console.log('read status', event)
    console.log(this.bookData, )
    this.sortBooksByReadStatus(event.value)
  }

  sortBooksByReadStatus(readStatus) {
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
    this.selectedSort = softTypeValue;
    const booksSortedByDate = [...this.bookData];
    booksSortedByDate.sort((a, b) => a.year - b.year);
    if (softTypeValue === 'newest') {
      booksSortedByDate.reverse();
    }
    this.bookData = booksSortedByDate;
  }

}
