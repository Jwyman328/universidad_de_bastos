import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent implements OnInit {
  @Input('pageDetails') pageDetails;;
  @Input('title') title;
  @Input('imageLocation') imageLocation;
  @Input('urlLocation') urlLocation;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToPage(){
    this.route.navigate([this.urlLocation])
  }

}
