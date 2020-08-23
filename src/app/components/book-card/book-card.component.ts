import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../../services/http-requests/books.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input('bookData') bookData;
  isRead: boolean;
  constructor(private booksService: BooksService) {}

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

  private addBookToIsReadBooks() {
    this.booksService.removeBookRead(this.bookData._id).subscribe((res) => {
      console.log('book not rad');
    });
  }

  private removeBookFromisReadBooks() {
    this.booksService.addBookRead(this.bookData._id).subscribe((res) => {
      console.log('book rad');
    });
  }
}
