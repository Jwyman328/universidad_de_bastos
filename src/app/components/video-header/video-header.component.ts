import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-header',
  templateUrl: './video-header.component.html',
  styleUrls: ['./video-header.component.scss']
})
export class VideoHeaderComponent implements OnInit {
  @Input('videoTitle') videoTitle:string;
  constructor() { }

  ngOnInit(): void {
  }

}
