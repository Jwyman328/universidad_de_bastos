import { Component, OnInit } from '@angular/core';
import { allVideos } from '../../data/videoData';
@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss'],
})
export class AllVideosComponent implements OnInit {
  selectedInstitue = 'allInstitute';
  selectedSort = 'newest';
  selectedType = 'allType';
  allVideos = allVideos;
  yearSelected:any = 'anyYear' 
  selectedVideos = allVideos;

  //
  selectedItem = 'Select an item';
  selectOpen = false;

  openSelect(){
    this.selectOpen = !this.selectOpen
  }

  selectItem(value){
    this.selectedItem = value
    this.selectOpen = false

  }

  constructor() {}

  ngOnInit(): void {
    this.sortVideos(this.selectedSort)
  }

  queryVideos() {
    const theseVideos = this.allVideos.filter(
      (video) =>
        video.categories.includes(this.selectedInstitue) &&
        video.categories.includes(this.selectedType) &&  (String(video.year) === this.yearSelected || this.yearSelected === 'anyYear')
    );
    this.selectedVideos = theseVideos;
    this.sortVideos(this.selectedSort)
  }
  sortVideos(sortType){
  const currentVideos = [...this.selectedVideos]
  currentVideos.sort((a,b) => a.year-b.year)
    if (sortType === 'newest'){
      currentVideos.reverse()
    }
    this.selectedVideos = currentVideos
  }
}
