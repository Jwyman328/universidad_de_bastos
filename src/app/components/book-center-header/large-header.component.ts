import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'large-header',
  templateUrl: './large-header.component.html',
  styleUrls: ['./large-header.component.scss']
})
export class LargeHeaderComponent implements OnInit {
  @Input('headerTitle') headerTitle:string;
  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  goToHomePage(){
    this.route.navigate(['/'])
  }

}
