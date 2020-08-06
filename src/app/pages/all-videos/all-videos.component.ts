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

  institutionSelectOptions = [{value:'UFM', displayName:'UFM'}, {value:'xoanDeLugo',displayName:'Xoán de Lugo'}, {value:'juanDeMariana', displayName:'Juan De Mariana'}, {value:'allInstitute',displayName:'All'}]
  typeSelectOptions = [{value:'interview', displayName:'Entrevista'}, {value:'conference',displayName:'Conference'}, {value:'allType', displayName:'all'}]
  yearelectOptions = [{value:2012, displayName:'2012'}, {value:2013,displayName:'2013'}, {value:2014, displayName:'2014'},{value:2015, displayName:'2015'},{value:2016, displayName:'2016'},{value:2017, displayName:'2017'},{value:2018, displayName:'2018'},{value:2019, displayName:'2019'},{value:2020, displayName:'2020'},{value:'anyYear', displayName:'Any'}]


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
