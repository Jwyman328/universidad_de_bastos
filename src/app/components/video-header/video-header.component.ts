import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-header',
  templateUrl: './video-header.component.html',
  styleUrls: ['./video-header.component.scss']
})
export class VideoHeaderComponent implements OnInit {
  @Input('videoTitle') videoTitle:string;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToHomePage(){
    this.route.navigate(['/'])
  }

}
