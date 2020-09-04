import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { BooksService } from '../../services/http-requests/books.service';
import { book } from '../../models/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input('bookData') bookData:book;
  @Output('handleBookReadButton') handleBookReadButton = new EventEmitter()

  isRead: boolean;
  constructor(public booksService: BooksService) {}

  ngOnInit(): void {
    this.isRead = this.bookData.hasBeenReadByUser;
  }

  readIt() {
    if (this.isRead) {
      this.addBookToIsReadBooks();
    } else {
      this.removeBookFromisReadBooks();
    }
    this.isRead = !this.isRead;
  }

   addBookToIsReadBooks() {
    this.booksService.removeBookRead(this.bookData._id).subscribe((res) => {
      this.handleBookReadButton.emit('bookLikeStatusChanged')
    });
  }

   removeBookFromisReadBooks() {
    this.booksService.addBookRead(this.bookData._id).subscribe((res) => {
      this.handleBookReadButton.emit('bookLikeStatusChanged')
    });
  }
}
