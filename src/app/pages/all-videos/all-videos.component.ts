import { Component, OnInit } from '@angular/core';
import { allVideos } from '../../data/videoData';
@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss'],
})
export class AllVideosComponent implements OnInit {
  selectedInstitue = 'allInstitute';
  selectedType = 'allType';
  allVideos = allVideos;
  yearSelected:any = 'anyYear' 
  selectedVideos = allVideos;
  constructor() {}

  ngOnInit(): void {}

  queryVideos() {
    const theseVideos = this.allVideos.filter(
      (video) =>
        video.categories.includes(this.selectedInstitue) &&
        video.categories.includes(this.selectedType) &&  (String(video.year) === this.yearSelected || this.yearSelected === 'anyYear')
    );
    this.selectedVideos = theseVideos;
  }
}
