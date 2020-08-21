import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input('bookData') bookData;
  isRead: boolean;
  constructor() { }

  ngOnInit(): void {
   this.isRead = this.bookData.hasBeenReadByUser
  }

  readIt(){
    this.isRead = !this.isRead
  }

}
