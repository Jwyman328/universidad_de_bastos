import { Component, OnInit } from '@angular/core';
import { bookData } from 'src/app/data/bookData';
import { BooksService } from '../../services/http-requests/books.service';

@Component({
  selector: 'app-book-center',
  templateUrl: './book-center.component.html',
  styleUrls: ['./book-center.component.scss']
})
export class BookCenterComponent implements OnInit {
  bookData;;
  constructor(private booksService:BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((res)=>{
      console.log('the book response', res)
      this.bookData = res
    })
  }

}
