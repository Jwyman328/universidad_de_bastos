import { Component, OnInit } from '@angular/core';
import { allVideos } from '../../data/videoData';
import { VideoWatchedService } from 'src/app/services/http-requests/video-watched.service';
import { video } from 'src/app/models/video';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss'],
})
export class AllVideosComponent implements OnInit {
  selectedInstitue = 'allInstitute';
  selectedSort = 'newest';
  selectedType = 'allType';
  allVideos: video[]; //allVideos;
  yearSelected: any = 'any';
  selectedVideos; //allVideos;
  watchedSortStatus : 'All' | boolean = 'All';

  watchedSortSelectOptions = [
    { value: 'All', displayName: 'All' },
    { value: true, displayName: 'Mirado' },
    { value: false, displayName: 'No Mirado' },
  ];

  institutionSelectOptions = [
    { value: 'allInstitute', displayName: 'All' },
    { value: 'UFM', displayName: 'UFM' },
    { value: 'xoanDeLugo', displayName: 'Xoán de Lugo' },
    { value: 'juanDeMariana', displayName: 'J D Mariana' },
  ];
  typeSelectOptions = [
    { value: 'allType', displayName: 'all' },
    { value: 'interview', displayName: 'Entrevista' },
    { value: 'conference', displayName: 'Conference' },
  ];
  yearelectOptions = [
    { value: 'anyYear', displayName: 'any' },
    { value: 2012, displayName: '2012' },
    { value: 2013, displayName: '2013' },
    { value: 2014, displayName: '2014' },
    { value: 2015, displayName: '2015' },
    { value: 2016, displayName: '2016' },
    { value: 2017, displayName: '2017' },
    { value: 2018, displayName: '2018' },
    { value: 2019, displayName: '2019' },
    { value: 2020, displayName: '2020' },
  ];
  sortSelectOptions = [
    { value: 'newest', displayName: 'Newest' },
    { value: 'oldest', displayName: 'Oldest' },
  ];

  //
  selectedItem = 'Select an item';
  selectOpen = false;


  constructor(private videoWatchedService: VideoWatchedService) {}

  ngOnInit(): void {
    this.videoWatchedService.getAllVideos().subscribe((res) => {
      this.allVideos = res;
      console.log(res);
      this.queryVideos();
      this.sortVideos(this.selectedSort);
    });
  }

  setInstitution(institution) {
    this.selectedInstitue = institution.value;
    this.queryVideos();
  }

  setType(type) {
    this.selectedType = type.value;
    this.queryVideos();
  }

  setYear(year) {
    this.yearSelected = year.displayName;
    this.queryVideos();
  }

  setWatchedSortStatus(watchedSortStatus) {
    this.watchedSortStatus = watchedSortStatus.value;
    this.queryVideos();
  }

  openSelect() {
    this.selectOpen = !this.selectOpen;
  }

  selectItem(value) {
    this.selectedItem = value;
    this.selectOpen = false;
  }

  queryVideos() {
    try{
      console.log('all vids',allVideos)
      let theseVideos = this.allVideos.filter(
        (video) =>{
          video.categories.includes(this.selectedInstitue) &&
          video.categories.includes(this.selectedType) &&
          (String(video.year) === this.yearSelected ||
            this.yearSelected === 'any') &&
          (video.hasBeenWatchedByUser === this.watchedSortStatus ||
            this.watchedSortStatus === 'All')
        });
        console.log('wueried',theseVideos)
      this.selectedVideos = theseVideos;
      this.sortVideos(this.selectedSort);
    }catch(e){
      console.log('err')
    }
    
  }

  sortVideos(sortType) {
    let softTypeValue = sortType;
    if (sortType.value) {
      softTypeValue = sortType.value;
    }
    this.selectedSort = softTypeValue;
    const currentVideos = [...this.selectedVideos];
    currentVideos.sort((a, b) => a.year - b.year);
    if (softTypeValue === 'newest') {
      currentVideos.reverse();
    }
    this.selectedVideos = currentVideos;
  }
}
