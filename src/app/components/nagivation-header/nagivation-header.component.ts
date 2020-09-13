import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nagivation-header',
  templateUrl: './nagivation-header.component.html',
  styleUrls: ['./nagivation-header.component.scss'],
})
export class NagivationHeaderComponent implements OnInit {
  isMobileHeader = false;
  isMobileHeaderOpen = true;

  constructor(private route: Router) {}

  public innerWidth: any;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.onResize(true)
  }

  navigateTo(page) {
    this.route.navigate([page]);
  }
  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth  <= 830){
      this.isMobileHeader=true
    }else{
      this.isMobileHeader=false

    }
  }
}
