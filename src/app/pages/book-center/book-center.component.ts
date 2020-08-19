import { Component, OnInit } from '@angular/core';
import { bookData } from 'src/app/data/bookData';

@Component({
  selector: 'app-book-center',
  templateUrl: './book-center.component.html',
  styleUrls: ['./book-center.component.scss']
})
export class BookCenterComponent implements OnInit {
  bookData = bookData;
  constructor() { }

  ngOnInit(): void {
  }

}
