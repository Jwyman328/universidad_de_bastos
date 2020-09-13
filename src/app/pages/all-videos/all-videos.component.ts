import { Component, OnInit, HostListener } from '@angular/core';
import { VideoWatchedService } from 'src/app/services/http-requests/video-watched.service';
import { video } from 'src/app/models/video';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss'],
})
export class AllVideosComponent implements OnInit {
  selectedInstitue = { value: 'allInstitute', displayName: 'Todos' };
  selectedSort = { value: 'nuevo', displayName: 'nuevo' };
  selectedType = { value: 'allType', displayName: 'Todos' };
  allVideos: video[]; 
  yearSelected: any = 'Todos';
  selectedVideos; 
  watchedSortStatus: any = { value: 'All', displayName: 'Todos' };

  watchedSortSelectOptions = [
    { value: 'All', displayName: 'Todos' },
    { value: true, displayName: 'Mirado' },
    { value: false, displayName: 'No Mirado' },
  ];

  institutionSelectOptions = [
    { value: 'allInstitute', displayName: 'Todos' },
    { value: 'UFM', displayName: 'UFM' },
    { value: 'xoanDeLugo', displayName: 'Xoán de Lugo' },
    { value: 'juanDeMariana', displayName: 'J D Mariana' },
  ];
  typeSelectOptions = [
    { value: 'allType', displayName: 'Todos' },
    { value: 'interview', displayName: 'Entrevista' },
    { value: 'conference', displayName: 'Conferencia' },
  ];
  yearelectOptions = [
    { value: 'anyYear', displayName: 'Todos' },
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
    { value: 'nuevo', displayName: 'nuevo' },
    { value: 'viejo', displayName: 'viejo' },
  ];


  selectedItem = 'Select an item';
  selectOpen = false;
  isVideosLoading = true;

  constructor(private videoWatchedService: VideoWatchedService) {}

  isMobileView = false;
  isFilterOpen = false;
  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.videoWatchedService.getAllVideos().subscribe((res) => {
      this.allVideos = res;
      this.queryVideos();
      this.sortVideos(this.selectedSort);
      if (res.length > 0) {
        this.isVideosLoading = false;
      }
    });
    this.onResize(true);
  }

  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1165) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }

  openFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  setInstitution(institution) {
    this.selectedInstitue = institution;
    this.queryVideos();
  }

  setType(type) {
    this.selectedType = type; 
    this.queryVideos();
  }

  setYear(year) {
    this.yearSelected = year.displayName;
    this.queryVideos();
  }

  setWatchedSortStatus(watchedSortStatus) {
    this.watchedSortStatus = watchedSortStatus;
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
    let theseVideos = this.allVideos.filter(
      (video) =>
        video.categories.includes(this.selectedInstitue.value) &&
        video.categories.includes(this.selectedType.value) &&
        (String(video.year) === this.yearSelected ||
          this.yearSelected === 'Todos') &&
        (video.hasBeenWatchedByUser === this.watchedSortStatus.value ||
          this.watchedSortStatus.value === 'All')
    );
    this.selectedVideos = theseVideos;
    this.sortVideos(this.selectedSort);
  }

  sortVideos(sortType) {

    this.selectedSort = sortType;
    const currentVideos = [...this.selectedVideos];
    currentVideos.sort((a, b) => a.year - b.year);
    if (sortType.value === 'nuevo') {
      currentVideos.reverse();
    }
    this.selectedVideos = currentVideos;
  }
}
