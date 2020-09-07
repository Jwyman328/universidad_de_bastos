import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nagivation-header',
  templateUrl: './nagivation-header.component.html',
  styleUrls: ['./nagivation-header.component.scss']
})
export class NagivationHeaderComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  navigateTo(page){
    this.route.navigate([page])

  }

}
