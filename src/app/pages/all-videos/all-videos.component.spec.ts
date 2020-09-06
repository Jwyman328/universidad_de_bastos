import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVideosComponent } from './all-videos.component';
import { VideoWatchedService } from 'src/app/services/http-requests/video-watched.service';
import { videoDataMock } from 'src/app/testing/mockData/videoDataMock';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

let videoWatchedService: VideoWatchedService;
fdescribe('AllVideosComponent', () => {
  let component: AllVideosComponent;
  let fixture: ComponentFixture<AllVideosComponent>;

  beforeEach(async(() => {
    videoWatchedService = jasmine.createSpyObj('VideoWatchedService', [
      'getAllVideos',
    ]);
    videoWatchedService.getAllVideos = jasmine
      .createSpy('getAllVideos')
      .and.returnValue(of([videoDataMock]));
    TestBed.configureTestingModule({
      declarations: [AllVideosComponent],
      providers: [
        { provide: VideoWatchedService, useValue: videoWatchedService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have ngOnInIt call getAllVideos', () => {
    component.ngOnInit();
    expect(videoWatchedService.getAllVideos).toHaveBeenCalled();
  });

  it('should have all videos set by the videos returned from getAllVideos', () => {
    component.ngOnInit();
    expect(component.allVideos).toEqual([videoDataMock]);
  });

  it('should call queryVideos and sortVideos in ngOninit', () => {
    spyOn(component, 'queryVideos');
    spyOn(component, 'sortVideos');

    component.ngOnInit();
    expect(component.queryVideos).toHaveBeenCalled();
    expect(component.sortVideos).toHaveBeenCalledWith('newest');
  });

  it('setInstitute should set selectedInstitue and call queryVideos', () => {
    spyOn(component, 'queryVideos');

    component.setInstitution({
      value: 'mockInstitute',
      displayName: 'mockInstitute',
    });
    expect(component.selectedInstitue).toEqual('mockInstitute');
    expect(component.queryVideos).toHaveBeenCalled();
  });

  it('setType sets sortType and queryVideos', () => {
    spyOn(component, 'queryVideos');

    component.setType({ value: 'mockType', displayName: 'mockType' });
    expect(component.selectedType).toEqual('mockType');
    expect(component.queryVideos).toHaveBeenCalled();
  });

  it('setYear sets year and calls queryVideos', () => {
    spyOn(component, 'queryVideos');

    component.setYear({ value: 2012, displayName: '2012' });
    expect(component.yearSelected).toEqual('2012');
    expect(component.queryVideos).toHaveBeenCalled();
  });

  it('openSelect changes selectOpen', () => {
    component.selectOpen = false;
    component.openSelect();
    expect(component.selectOpen).toEqual(true);
  });

  it('queryVideos() should set selectedVideos of videos that match the selected sorts', () => {
    const videoDataMockToGetSelected = [
      {
        categories: [
          'allInstitute',
          'allType',
          'interview',
          'UFM',
          'rothbard',
          'state',
        ],
        course: null,
        hasBeenWatchedByUser: false,
        image:
          'https://yt3.ggpht.com/a/AATXAJySIH-YIoFb-eOgHw-DllI68JB8hKtEuNaHXLsJSA=s288-c-k-c0xffffffff-no-rj-mo',
        noteCount: 0,
        title:
          'Poder y Mercado: el Gobierno y la Economía | Miguel Anxo Bastos y Gabriel Calzada',
        videoUrl: 'zgnht-gW8Ks',
        year: 2016,
        _id: '5f4beedb2e563d1ac53e2615',
      },
    ];

    component.yearSelected = '2016';
    component.watchedSortStatus = 'All';

    component.allVideos = [...videoDataMockToGetSelected, videoDataMock];
    component.queryVideos();

    expect(component.selectedVideos).toEqual(videoDataMockToGetSelected);
  });

  it('queryVideos() should call sortVideos with selectedSort', () => {
    spyOn(component, 'sortVideos');
    component.selectedSort = 'mockSort';
    component.queryVideos();

    expect(component.sortVideos).toHaveBeenCalledWith('mockSort');
  });

  it('sortVideos should sort videos by year newest to oldest with newest param', () => {
    let videoDataMockNew = {...videoDataMock}
    videoDataMockNew.year = 2020
    component.selectedVideos = [videoDataMock,videoDataMockNew]
    component.sortVideos('newest');

    expect(component.selectedVideos[0]).toEqual(videoDataMockNew)
    expect(component.selectedVideos[1]).toEqual(videoDataMock)

  });

  it('sortVideos should sort videos by year oldest to newest with oldest param', () => {
    let videoDataMockNew = {...videoDataMock}
    videoDataMockNew.year = 2020
    component.selectedVideos = [videoDataMock,videoDataMockNew]
    component.sortVideos('oldest');

    expect(component.selectedVideos[0]).toEqual(videoDataMock)
    expect(component.selectedVideos[1]).toEqual(videoDataMockNew)

  });
});
