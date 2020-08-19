import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-center-header',
  templateUrl: './book-center-header.component.html',
  styleUrls: ['./book-center-header.component.scss']
})
export class BookCenterHeaderComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToHomePage(){
    this.route.navigate(['/'])
  }

}
