import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate-to-page-button',
  templateUrl: './navigate-to-page-button.component.html',
  styleUrls: ['./navigate-to-page-button.component.scss']
})
export class NavigateToPageButtonComponent implements OnInit {
  @Input('navigatePageText') navigatePageText:string;
  @Input('route') routeUrl:string;
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  navigateToPage = () => {
    this.route.navigate([this.routeUrl])
  }

}
