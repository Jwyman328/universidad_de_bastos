import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input('videoData') videoData;
  constructor(private route: Router) {    
  }

  ngOnInit(): void {
  }

  goToNoteCenter(){
    this.route.navigate(['video-center',`${this.videoData.videoUrl}`,`${this.videoData.title}`])
  }

}
